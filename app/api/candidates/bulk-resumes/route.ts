import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const files = formData?.getAll("files").filter((value): value is File => value instanceof File) ?? [];

  if (!files.length) {
    return NextResponse.json({ message: "Please choose at least one resume file to upload." }, { status: 400 });
  }

  const backendFormData = new FormData();
  files.forEach((file) => backendFormData.append("files", file));

  const { response, auth } = await backendFetch("/api/v1/candidates/bulk/resumes", {
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
        { message: extractErrorMessage(data, "Failed to upload candidate profiles in bulk.") },
        { status: response.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json(data, { status: response.status || 201 }), auth);
}
