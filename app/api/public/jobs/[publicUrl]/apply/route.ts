import { NextResponse } from "next/server";
import { extractErrorMessage, getApiUrl } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    publicUrl: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { publicUrl } = await context.params;
  const body = await request.json().catch(() => null);

  const response = await fetch(getApiUrl(`/api/v1/jobs/public/${publicUrl}/apply`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ?? {}),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(data, "Failed to submit application.") },
      { status: response.status || 500 },
    );
  }

  return NextResponse.json(data, { status: response.status || 201 });
}
