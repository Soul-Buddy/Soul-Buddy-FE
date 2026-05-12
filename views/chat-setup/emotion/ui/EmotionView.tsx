"use client";

import { useRouter } from "next/navigation";
import { useChatSetupStore } from "@/features/chat/select-buddy";
import { TopBar } from "@/shared/ui/TopBar";
import { BackButton } from "@/shared/ui/BackButton";
import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { EmotionGrid } from "@/widgets/emotion-grid";

export function EmotionView() {
  const router = useRouter(); // Next.js의 라우터 훅을 사용하여 페이지 이동을 제어
  const emotionId = useChatSetupStore((s) => s.emotionId); // Zustand 스토어에서 선택된 감정 ID를 가져옴
  const setEmotion = useChatSetupStore((s) => s.setEmotion); // Zustand 스토어에서 감정 선택 함수를 가져옴
  const buddyId = useChatSetupStore((s) => s.buddyId); // Zustand 스토어에서 선택된 버디 ID를 가져옴

  // 채팅 시작 핸들러: 감정과 버디가 모두 선택된 경우 새로운 채팅 페이지로 이동
  const handleStart = () => {
    if (!buddyId || !emotionId) return; // 버디나 감정이 선택되지 않은 경우 함수 종료
    const newId = `chat-${Date.now()}`; // 새로운 채팅 ID 생성 (예시로 현재 타임스탬프 사용)
    router.replace(`/chat/${newId}`); // 새로운 채팅 페이지로 이동 (replace를 사용하여 뒤로 가기 시 이전 페이지로 돌아가지 않도록 함)
  };

  return (
    <Screen
      header={
        <TopBar leading={<BackButton fallbackHref="/chat/new/buddy" />} /> // 상단 바에 뒤로 가기 버튼 추가, 클릭 시 버디 선택 페이지로 이동
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
          가장 가까운 감정 하나를 골라주세요
        </p>
      </section>

      <div className="mt-6">
        <EmotionGrid selectedId={emotionId} onSelect={setEmotion} />
      </div>
    </Screen>
  );
}
