import { GoogleLoginButton } from "@/features/auth/google-login";
import Icon from '@/shared/assets/icon.png'
import Image from "next/image";

export function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white ">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Zero One Counsel</h1>
          <p className="text-sm text-gray-500">당신만의 AI 소울메이트 - Zero One Counsel</p>
          <Image src={Icon} alt ="Icon" width={200}/>
        </div>
        <GoogleLoginButton />
      </div>
    </main>
  );
}
