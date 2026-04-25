import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { GoogleLoginButton } from "@/features/auth/google-login";
import { AppHeader } from "@/shared/ui/AppHeader";
import { Card } from "@/shared/ui/Card";
import { IconButton } from "@/shared/ui/IconButton";
import { Screen } from "@/shared/ui/Screen";
import buddyImage from "@/shared/assets/helloIcon.png";

export function LoginPage() {
  return (
    <Screen
      header={
        <AppHeader
          trailing={
            <IconButton variant="plain" size="sm" aria-label="더보기">
              <MoreHorizontal />
            </IconButton>
          }
        />
      }
    >
      <div className="flex h-full flex-col pt-6">
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

        <Card surface="default" padding="lg" className="mt-10 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center">
            <Image
              src={buddyImage}
              alt="버디 캐릭터"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col items-center text-center">
            <p className="text-xs text-[var(--color-text-muted)]">안녕 친구, 만나서 반가워</p>
            <p className="text-[15px] font-semibold text-[var(--color-text)]">
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
