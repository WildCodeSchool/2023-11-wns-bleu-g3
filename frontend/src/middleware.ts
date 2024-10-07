import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_PRIVATE_KEY = new TextEncoder().encode(
  process.env.JWT_PRIVATE_KEY || ""
);

// console.log({ JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY });

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  try {
    const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (payload.role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (payload.userId) return NextResponse.next();

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // console.log({ token });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/profile"],
};
