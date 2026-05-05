"use client";

import { useRouter } from "next/navigation";
import { findBuddy } from "@/entities/buddy";
import { useChatSetupStore } from "@/features/chat/select-buddy";
import { AppHeader } from "@/shared/ui/AppHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { BuddyPicker } from "@/widgets/buddy-picker";

export function BuddyView() {
  const router = useRouter();
  const buddyId = useChatSetupStore((s) => s.buddyId);
  const setBuddy = useChatSetupStore((s) => s.setBuddy);

  const selectedName = buddyId ? findBuddy(buddyId).name : null;

  return (
    <Screen
      tone="dark"
      header={
        <AppHeader
          statusBarTone="dark"
          leading={<BackButton fallbackHref="/" tone="dark" />}
        />
      }
      footer={
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!buddyId}
          onClick={() => router.push("/chat/new/emotion")}
        >
          {selectedName ? `${selectedName}와 시작하기` : "친구를 골라주세요"}
        </Button>
      }
    >
      <section className="mt-2 flex flex-col gap-2">
        <h1 className="text-[22px] leading-[1.35] font-bold text-white">
          오늘은 어떤 친구와
          <br />
          이야기 나눠 볼까요?
        </h1>
        <p className="text-[13px] text-white/60">
          버디는 언제든 다시 바꿀 수 있어요
        </p>
      </section>

      <div className="mt-6">
        <BuddyPicker selectedId={buddyId} onSelect={setBuddy} />
      </div>
    </Screen>
  );
}
