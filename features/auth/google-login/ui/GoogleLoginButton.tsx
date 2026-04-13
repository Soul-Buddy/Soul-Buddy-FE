"use client"; // CSR 컴포넌트 지정

import { useState } from "react";
import { signIn } from "next-auth/react"; // NextAuth에서 제공하는 메서드(딸깍 구현)
import { Loader2 } from "lucide-react";

export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false); // 로그인 상태

  const handleLogin = async () => { 
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("로그인 실패!", error);
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handleLogin} // 구글 로그인 실행 후 루트로 돌아감
      disabled={isLoading}
      className="flex w-full max-w-xs cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm transition-shadow hover:shadow-md"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      ) : (
      <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.46 3.09 29.54 1 24 1 14.82 1 7.01 6.48 3.69 14.24l7.08 5.5C12.43 13.67 17.76 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v8.97h12.67c-.55 2.94-2.2 5.43-4.68 7.1l7.18 5.58C43.35 37.63 46.52 31.55 46.52 24.5z"
        />
        <path
          fill="#FBBC05"
          d="M10.77 28.26A14.56 14.56 0 0 1 9.5 24c0-1.48.25-2.91.68-4.26l-7.08-5.5A23.94 23.94 0 0 0 0 24c0 3.87.93 7.52 2.56 10.74l8.21-6.48z"
        />
        <path
          fill="#34A853"
          d="M24 47c5.54 0 10.19-1.84 13.58-4.98l-7.18-5.58c-1.85 1.24-4.2 1.97-6.4 1.97-6.24 0-11.57-4.17-13.23-9.74l-8.21 6.48C7.01 41.52 14.82 47 24 47z"
        />
      </svg>
      )}
      <span className="text-sm font-medium text-gray-700">
        {isLoading ? "로그인 중..." : "Google로 로그인"}
      </span>
    </button>
  );
}
