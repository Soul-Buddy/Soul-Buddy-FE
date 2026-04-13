"use client";

import { SessionProvider } from "next-auth/react";

/** 상태 관리나 테마 등 전역 컨텍스트를 감싸는 래퍼 컴포넌트 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
