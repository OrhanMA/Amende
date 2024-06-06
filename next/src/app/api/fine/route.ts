import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  const token = cookies().get("token")?.value;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": token }),
  };

  const res = await fetch(`http://localhost:8000/api/fine/check/${code}`, {
    headers: headers,
  });
  const data = await res.json();

  return NextResponse.json({ fine: data.fine });
}
