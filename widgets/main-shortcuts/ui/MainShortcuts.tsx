"use client";

import { useRouter } from "next/navigation";
import { BookOpen, MapPin } from "lucide-react";
import { Card } from "@/shared/ui/Card";

interface MainShortcutsProps {
  historyCount: number;
  centerCount: number;
}

/**
 * 메인 단축키 컴포넌트
 * - 대화 기록과 상담 센터에 대한 정보를 표시
 * @param param0 
 * @returns 
 */
export function MainShortcuts({ historyCount, centerCount }: MainShortcutsProps) {
  const router = useRouter();

  return (
    <section className="grid grid-cols-2 gap-3">
      {/* 대화 기록 카드 */}
      <Card
        surface="default"
        padding="md"
        shadow
        className="cursor-pointer"
        onClick={() => router.push("/history")}
      >
        <div className="flex flex-col gap-2">
          <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
          <span className="text-[14px] font-semibold text-[var(--color-text)]">
            대화 기록
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {historyCount}개의 이야기
          </span>
        </div>
      </Card>
      {/* 상담 센터 카드 */}
      <Card
        surface="default"
        padding="md"
        shadow
        className="cursor-pointer"
        onClick={() => router.push("/centers")}
      >
        <div className="flex flex-col gap-2">
          <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
          <span className="text-[14px] font-semibold text-[var(--color-text)]">
            상담 센터
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            근처 {centerCount}곳
          </span>
        </div>
      </Card>
    </section>
  );
}
