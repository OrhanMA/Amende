import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const route = url.pathname;

  if (route === "/logout") {
    const response = NextResponse.redirect(new URL("/login", url.clone()));
    response.cookies.delete("token");
    response.cookies.delete("refresh_token");
    return response;
  }

  const token = request.cookies.get("token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;

  // console.log("MIDDLEWARE JWT token is: ", token);

  if (!token) {
    const urlClone = url.clone();
    urlClone.pathname = "/login";
    return NextResponse.redirect(urlClone);
  }

  const tokenExpired = isTokenExpired(token);

  if (tokenExpired) {
    const urlClone = url.clone();
    urlClone.pathname = "/login";
    return NextResponse.redirect(urlClone);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|register|login|$).*)",
  ],
};
