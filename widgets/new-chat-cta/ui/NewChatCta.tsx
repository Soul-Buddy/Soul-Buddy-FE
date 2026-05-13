"use client"; // Next.js의 클라이언트 컴포넌트로 설정

import { useRouter } from "next/navigation";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useChatSetupStore } from "@/features/chat/select-buddy";
import { Plus } from "lucide-react";

/**
 * 새로운 대화 시작을 유도하는 CTA( Call to Action ) 컴포넌트
 * - 메인 화면에서 사용자가 새로운 대화를 쉽게 시작할 수 있도록 디자인
 * - 클릭 시 새로운 대화 생성 페이지로 이동
 * @returns 
 */
export function NewChatCta() {
  const router = useRouter();
  const reset = useChatSetupStore((s) => s.reset); // Zustand 스토어에서 대화 설정 초기화 함수 가져오기

  return (
    <Card surface="dark" padding="lg" className="flex justify-between items-center">
      <div>
        <p className="text-xs text-[var(--color-text-muted)]"> 지금 바로</p>
        <h3 className="text-[18px] leading-snug font-bold">새로운 대화 열기</h3>
      </div>
      <Button
        variant="primary"
        size="lg" 
        onClick={() => {
          reset(); // 대화 설정 초기화
          router.push("/chat/new/buddy");
        }} // 클릭 시 새로운 대화 생성 페이지로 이동
        className="self-start text-[var(--color-background)] w-14 h-14 -px-6"
      >
        <Plus className="size-7" strokeWidth={2} />
      </Button>
    </Card>
  );
}
