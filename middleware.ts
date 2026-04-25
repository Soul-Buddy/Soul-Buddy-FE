import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PROFILE_COOKIE = "profileCompleted";
const ONBOARDING_PATHS = ["/onboarding"];
const PUBLIC_PATHS = ["/login"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthed = !!req.auth;
  const isProfileComplete = req.cookies.get(PROFILE_COOKIE)?.value === "true";

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const isOnboarding = ONBOARDING_PATHS.some((p) => pathname.startsWith(p));

  if (isPublic) {
    if (isAuthed && isProfileComplete) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (isAuthed && !isProfileComplete) {
      return NextResponse.redirect(new URL("/onboarding/terms", req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthed) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isOnboarding) {
    return NextResponse.next();
  }

  if (!isProfileComplete) {
    return NextResponse.redirect(new URL("/onboarding/terms", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|favicon|manifest|icons|.*\\..*).*)"],
};
