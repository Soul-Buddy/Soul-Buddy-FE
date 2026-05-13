import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PROFILE_COOKIE = "profileCompleted";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthed = !!req.auth;
  const profileCompleted = req.cookies.get(PROFILE_COOKIE)?.value === "true";

  if (pathname === "/login") {
    if (isAuthed) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (!isAuthed) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!profileCompleted && !pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding/terms", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|favicon|manifest|icons|.*\\..*).*)"],
};
