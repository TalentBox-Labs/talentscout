import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";

export async function GET(_request: Request, { params }: { params: Promise<{ candidateId: string }> }) {
  const { candidateId } = await params;
  const { response, auth } = await backendFetch(`/api/v1/candidates/${candidateId}`);

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
        { message: extractErrorMessage(data, "Failed to load candidate profile.") },
        { status: response.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json(data), auth);
}