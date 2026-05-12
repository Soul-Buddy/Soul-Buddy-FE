"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react"; // 닫기 아이콘
import { signOut } from "next-auth/react";
import { TopBar } from "@/shared/ui/TopBar";
import { IconButton } from "@/shared/ui/IconButton";
import { Screen } from "@/shared/ui/Screen";
import {
  AgreeCheckbox,
  ConfirmButton,
  TERMS_ITEMS,
  TermsCard,
} from "@/features/onboarding/agree-terms";

export function TermsView() {
  const router = useRouter();
  return (
    <Screen
      header={ // 상단 바에 닫기 버튼 추가
        <TopBar
          leading={
            <IconButton
              variant="plain"
              size="md"
              aria-label="닫기"
              onClick={async () => {
                await signOut({ redirect: false }); // 로그아웃 처리
                router.replace("/login"); // 로그인 페이지로 이동
              }}
            >
              <X />
            </IconButton>
          }
        />
      }
      footer={
        <div className="flex flex-col gap-3 border-t pt-3 border-[var(--color-border-strong)] -mx-5">
          <div className="flex flex-col gap-6 items-center justify-center rounded-(--radius-md) px-4 py-3">
            <AgreeCheckbox />
            <ConfirmButton />
          </div>
          
        </div>
      }
    >
      <h1 className="mt-2 text-[22px] leading-[1.35] font-bold text-[var(--color-text)] text-center">
        시작 전에, 세 가지만 알려드릴게요
      </h1>
      <div className="mt-6 flex flex-col gap-3">
        {TERMS_ITEMS.map((item) => (
          <TermsCard key={item.id} item={item} />
        ))}
      </div>
    </Screen>
  );
}
