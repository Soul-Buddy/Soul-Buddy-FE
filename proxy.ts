import { NextResponse } from "next/server";

// TODO(auth): Google OAuth redirect_uri 정리 후 인증 가드 복구.
// 원래 로직: 미인증 → /login, 프로필 미완료 → /onboarding/terms.
// shared/api/mock/profileStorage.ts 의 saveProfileMock 이 profileCompleted=true 쿠키를 세팅함.
export default function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon|manifest|icons|.*\\..*).*)"],
};
