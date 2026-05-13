import { Card } from "@/shared/ui/Card";

/**
 * 상담 센터 카드 로딩 상태를 나타내는 스켈레톤 컴포넌트
 * @returns 
 */
export function CenterCardSkeleton() {
  return (
    <Card surface="default" padding="md" shadow className="w-full">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-[var(--radius-sm)] bg-[var(--color-surface-strong)]" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--color-surface-strong)]" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--color-surface-strong)]" />
          <div className="mt-1 flex gap-1.5">
            <div className="h-5 w-14 animate-pulse rounded-full bg-[var(--color-surface-strong)]" />
            <div className="h-5 w-16 animate-pulse rounded-full bg-[var(--color-surface-strong)]" />
          </div>
        </div>
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-[var(--color-surface-strong)]" />
      </div>
    </Card>
  );
}
