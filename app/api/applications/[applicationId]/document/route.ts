import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";

type RouteContext = {
  params: Promise<{
    applicationId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { applicationId } = await context.params;
  const formData = await request.formData();

  const { response, auth } = await backendFetch(`/api/v1/applications/${applicationId}/document`, {
    method: "POST",
    body: formData,
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
        { message: extractErrorMessage(data, "Failed to upload application document.") },
        { status: response.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json(data, { status: response.status || 200 }), auth);
}
