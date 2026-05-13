import { cn } from "@/shared/lib/cn";
import { Card } from "@/shared/ui/Card";
import type { TermsItem } from "../model/items";

interface TermsCardProps {
  item: TermsItem;
}

/**
 * 약관 카드 컴포넌트
 * @param param0 // 약관 아이템을 받아서 카드 형태로 렌더링
 * @returns
 */
export function TermsCard({ item }: TermsCardProps) {
  const isDanger = item.tone === "danger";
  const Icon = item.icon;
  return (
    <Card
      surface="default"
      padding="lg"
      className={cn("w-full border border-[var(--color-border-strong)]", isDanger && "bg-danger-soft")}
    >
      <div className="flex items-start gap-8">
        {/* 아이콘 컨테이너 */}
        <div
          className={cn(
            "flex h-13 w-13 shrink-0 items-center justify-center rounded-full",
            item.iconBgClass,
          )}
        >
          {/* 아이콘 */}
          <Icon className={cn("h-5 w-5", item.iconColorClass)} strokeWidth={2.2} />
        </div>
        {/* 내용 컨테이너 */}
        <div className="flex flex-1 flex-col gap-1">
          {/* 제목 */}
          <span
            className={cn(
              "text-[15px] font-bold",
              isDanger ? "text-danger" : "text-text",
            )}
          >
            {item.title}
          </span>
          {/* 본문 */}
          <p className="text-[13px] leading-[1.55] text-text-muted">
            {item.body}
          </p>
        </div>
      </div>
    </Card>
  );
}
