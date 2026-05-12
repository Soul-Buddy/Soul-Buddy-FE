import Image from "next/image";
import { GoogleLoginButton } from "@/features/auth/google-login";
import { Card } from "@/shared/ui/Card";
import { Screen } from "@/shared/ui/Screen";
import buddyImage from "@/shared/assets/helloIcon.png";

export function LoginPage() {
  return (
    <Screen>
      <div className="flex flex-1 flex-col mt-30">
        <section className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.18em] text-[var(--color-primary)]">
            ZEROONE
          </span>
          <h1 className="text-[28px] leading-[1.25] font-bold text-[var(--color-text)]">
            마음,
            <br />
            괜찮으신가요?
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            오늘의 작은 이야기부터 들어드릴게요.
          </p>
        </section>

        <Card surface="default" padding="lg" className="mt-8 flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center">
            <Image
              src={buddyImage}
              alt="버디 캐릭터"
              // object-contain으로 설정하여 이미지가 카드 영역 내에서 비율을 유지하며 최대한 크게 보이도록 함
              className="object-contain ml-16"
            />
          </div>
          <div className="flex flex-1 flex-col items-center text-center">
            <p className="text-xs text-[var(--color-text-muted)]">안녕 친구, 만나서 반가워</p>
            <p className="text-md font-semibold text-[var(--color-text)]">
              로그인하고 시작해요
            </p>
          </div>
        </Card>

        <div className="mt-10">
          <GoogleLoginButton />
        </div>
      </div>
    </Screen>
  );
}
