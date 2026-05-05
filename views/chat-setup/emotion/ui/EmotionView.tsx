"use client";

import { useRouter } from "next/navigation";
import { useChatSetupStore } from "@/features/chat/select-buddy";
import { AppHeader } from "@/shared/ui/AppHeader";
import { BackButton } from "@/shared/ui/BackButton";
import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { EmotionGrid } from "@/widgets/emotion-grid";

export function EmotionView() {
  const router = useRouter();
  const emotionId = useChatSetupStore((s) => s.emotionId);
  const setEmotion = useChatSetupStore((s) => s.setEmotion);
  const buddyId = useChatSetupStore((s) => s.buddyId);

  const handleStart = () => {
    if (!buddyId || !emotionId) return;
    const newId = `chat-${Date.now()}`;
    router.replace(`/chat/${newId}`);
  };

  return (
    <Screen
      header={
        <AppHeader leading={<BackButton fallbackHref="/chat/new/buddy" />} />
      }
      footer={
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.back()}
            className="min-w-24"
          >
            이전
          </Button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!emotionId}
            onClick={handleStart}
          >
            채팅 시작하기
          </Button>
        </div>
      }
    >
      <section className="mt-2 flex flex-col gap-2">
        <h1 className="text-[22px] leading-[1.35] font-bold text-[var(--color-text)]">
          지금 느껴지는 감정에
          <br />
          가까운 건 무엇인가요?
        </h1>
        <p className="text-[13px] text-[var(--color-text-muted)]">
          하나만 골라주세요
        </p>
      </section>

      <div className="mt-6">
        <EmotionGrid selectedId={emotionId} onSelect={setEmotion} />
      </div>
    </Screen>
  );
}
