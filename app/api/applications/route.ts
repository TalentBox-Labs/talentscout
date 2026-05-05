import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { response, auth } = await backendFetch("/api/v1/applications", {
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
        { message: extractErrorMessage(data, "Failed to create application.") },
        { status: response.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json(data, { status: response.status || 201 }), auth);
}