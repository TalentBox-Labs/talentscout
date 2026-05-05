import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { adminBackendFetch, applyBackendAuth } from "@/lib/admin-server";

export async function POST(request: Request, context: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await context.params;
  const body = (await request.json().catch(() => null)) as { reviewNotes?: string } | null;
  const reviewNotes = body?.reviewNotes?.trim();

  const query = reviewNotes ? `?review_notes=${encodeURIComponent(reviewNotes)}` : "";
  const { response: backendResponse, auth } = await adminBackendFetch(`/api/v1/admin/approval-requests/${requestId}/approve${query}`, {
    method: "POST",
  });

  if (!backendResponse) {
    return applyBackendAuth(
      NextResponse.json({ message: auth.errorMessage ?? "No active admin session." }, { status: 401 }),
      auth,
    );
  }

  const data = (await backendResponse.json().catch(() => null)) as Record<string, unknown> | null;

  if (!backendResponse.ok) {
    return applyBackendAuth(
      NextResponse.json(
        { message: extractErrorMessage(data, "Failed to approve request.") },
        { status: backendResponse.status || 500 },
      ),
      auth,
    );
  }

  return applyBackendAuth(NextResponse.json({ success: true, ...(data ?? {}) }), auth);
}
