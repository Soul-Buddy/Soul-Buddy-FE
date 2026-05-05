"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { signOut } from "next-auth/react";
import { AppHeader } from "@/shared/ui/AppHeader";
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
      header={
        <AppHeader
          leading={
            <IconButton
              variant="plain"
              size="md"
              aria-label="닫기"
              onClick={async () => {
                await signOut({ redirect: false });
                router.replace("/login");
              }}
            >
              <X />
            </IconButton>
          }
        />
      }
      footer={
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center">
            <AgreeCheckbox />
          </div>
          <ConfirmButton />
        </div>
      }
    >
      <h1 className="mt-2 text-[22px] leading-[1.35] font-bold text-[var(--color-text)]">
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
