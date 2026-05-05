import { mkdirSync, openSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import net from "node:net";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendRoot = resolve(__dirname, "..");
const workspaceRoot = resolve(frontendRoot, "..");
const backendDir = resolve(workspaceRoot, "TalentScout_ats-platform", "backend");
const nextBin = resolve(frontendRoot, "node_modules", "next", "dist", "bin", "next");
const extraArgs = process.argv.slice(2);
const divider = "─".repeat(68);

function printBanner(lines) {
  console.log(`\n${divider}`);
  for (const line of lines) {
    console.log(line);
  }
  console.log(`${divider}\n`);
}

function readEnvValue(key) {
  const envPath = resolve(frontendRoot, ".env");

  if (!existsSync(envPath)) {
    return undefined;
  }

  const content = readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const currentKey = line.slice(0, separatorIndex).trim();
    if (currentKey !== key) {
      continue;
    }

    return line.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");
  }

  return undefined;
}

function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || readEnvValue("NEXT_PUBLIC_API_BASE_URL") || "http://localhost:8000").replace(/\/$/, "");
}

function isLocalUrl(url) {
  return ["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname);
}

function wait(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

function probePort(host, port, timeout = 1200) {
  return new Promise((resolvePromise) => {
    const socket = net.createConnection({ host, port });
    const finish = (result) => {
      socket.destroy();
      resolvePromise(result);
    };

    socket.setTimeout(timeout);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
  });
}

async function isBackendReachable(url) {
  const port = Number(url.port || (url.protocol === "https:" ? 443 : 80));
  return probePort(url.hostname, port);
}

function getBackendLaunchCandidates() {
  if (process.platform === "win32") {
    return [
      { command: resolve(backendDir, "venv", "Scripts", "python.exe"), args: ["run.py"] },
      { command: "py", args: ["-3", "run.py"] },
      { command: "python", args: ["run.py"] },
    ];
  }

  return [
    { command: resolve(backendDir, "venv", "bin", "python"), args: ["run.py"] },
    { command: "python3", args: ["run.py"] },
    { command: "python", args: ["run.py"] },
  ];
}

async function startBackend(url) {
  if (!existsSync(backendDir)) {
    const message = `Backend folder not found at ${backendDir}`;
    console.warn(`[hirestack] ${message}. Starting frontend only.`);
    return { status: "missing", message };
  }

  const logsDir = resolve(frontendRoot, ".logs");
  mkdirSync(logsDir, { recursive: true });
  const logPath = resolve(logsDir, "backend-dev.log");
  const out = openSync(logPath, "a");

  for (const candidate of getBackendLaunchCandidates()) {
    if (candidate.command.includes("venv") && !existsSync(candidate.command)) {
      continue;
    }

    try {
      const child = spawn(candidate.command, candidate.args, {
        cwd: backendDir,
        detached: true,
        stdio: ["ignore", out, out],
      });

      child.unref();

      for (let attempt = 0; attempt < 40; attempt += 1) {
        if (await isBackendReachable(url)) {
          return {
            status: "started",
            message: `Backend auto-started on ${url.origin}`,
            logPath,
          };
        }

        await wait(500);
      }
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        continue;
      }

      console.warn(`[hirestack] Failed to launch backend with ${candidate.command}: ${error}`);
    }
  }

  console.warn(`[hirestack] Could not auto-start the backend. Check ${logPath}.`);
  return {
    status: "failed",
    message: `Backend did not start on ${url.origin}`,
    logPath,
  };
}

async function ensureBackend() {
  if (process.env.HIRESTACK_SKIP_BACKEND_AUTOSTART === "1") {
    return {
      status: "skipped",
      message: "Backend auto-start skipped via HIRESTACK_SKIP_BACKEND_AUTOSTART=1",
    };
  }

  const apiBaseUrl = getApiBaseUrl();
  const parsedUrl = new URL(apiBaseUrl);

  if (!isLocalUrl(parsedUrl)) {
    return {
      status: "remote",
      message: `Backend auto-start skipped because API points to ${parsedUrl.origin}`,
    };
  }

  if (await isBackendReachable(parsedUrl)) {
    return {
      status: "reused",
      message: `Backend already running on ${parsedUrl.origin}`,
    };
  }

  console.log(`[hirestack] Backend not detected on ${parsedUrl.origin}; attempting auto-start...`);
  return startBackend(parsedUrl);
}

function startFrontend() {
  const child = spawn(process.execPath, [nextBin, "dev", ...extraArgs], {
    cwd: frontendRoot,
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

const backendState = await ensureBackend();

printBanner([
  "HireStack local dev startup",
  `Frontend: http://localhost:3000`,
  `API base: ${getApiBaseUrl()}`,
  `Backend: ${backendState.message}`,
  ...(backendState.logPath ? [`Backend logs: ${backendState.logPath}`] : []),
  backendState.status === "failed"
    ? "Next step: start the backend manually or inspect the log path above."
    : "Next step: starting Next.js dev server...",
]);

startFrontend();
