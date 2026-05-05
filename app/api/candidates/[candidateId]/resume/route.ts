import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";

export async function POST(request: Request, { params }: { params: Promise<{ candidateId: string }> }) {
  const { candidateId } = await params;
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Please choose a resume file to upload." }, { status: 400 });
  }

  const backendFormData = new FormData();
  backendFormData.append("file", file);

  try {
    const { response, auth } = await backendFetch(`/api/v1/candidates/${candidateId}/resume`, {
      method: "POST",
      body: backendFormData,
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
          { message: extractErrorMessage(data, "Failed to upload resume.") },
          { status: response.status || 500 },
        ),
        auth,
      );
    }

    return applyBackendAuth(NextResponse.json(data, { status: response.status || 200 }), auth);
  } catch {
    return NextResponse.json({ message: "Could not reach the resume upload service." }, { status: 503 });
  }
}