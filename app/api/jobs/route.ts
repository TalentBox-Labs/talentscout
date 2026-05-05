import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";

type CreateJobRequest = {
  title?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string;
  skills_required?: string[];
  settings?: Record<string, unknown>;
  publish_immediately?: boolean;
};

export async function GET() {
  const { response, auth } = await backendFetch("/api/v1/jobs");

  if (!response) {
    return applyBackendAuth(
      NextResponse.json({ message: auth.errorMessage ?? "No active session." }, { status: 401 }),
      auth,
    );
  }

  const data = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return applyBackendAuth(
      NextResponse.json(
        { message: extractErrorMessage(data, "Failed to load jobs.") },
        { status: response.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json(data), auth);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CreateJobRequest | null;
  const { response, auth } = await backendFetch("/api/v1/jobs", {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });

  if (!response) {
    return applyBackendAuth(
      NextResponse.json({ message: auth.errorMessage ?? "No active session." }, { status: 401 }),
      auth,
    );
  }

  const data = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return applyBackendAuth(
      NextResponse.json(
        { message: extractErrorMessage(data, "Failed to create job.") },
        { status: response.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json(data, { status: response.status || 201 }), auth);
}