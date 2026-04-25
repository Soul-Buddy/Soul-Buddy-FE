import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { Card } from "@/shared/ui/Card";
import type { TermsItem } from "../model/items";

interface TermsCardProps {
  item: TermsItem;
}

export function TermsCard({ item }: TermsCardProps) {
  const isDanger = item.tone === "danger";
  return (
    <Card
      surface={isDanger ? "default" : "default"}
      padding="md"
      className={cn(
        "w-full",
        isDanger && "bg-[var(--color-danger-soft)]",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            isDanger ? "bg-[var(--color-danger)]/15" : "bg-[var(--color-surface-strong)]",
          )}
        >
          <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span
            className={cn(
              "text-[15px] font-semibold",
              isDanger ? "text-[var(--color-danger)]" : "text-[var(--color-text)]",
            )}
          >
            {item.title}
          </span>
          <p className="text-[13px] leading-[1.55] text-[var(--color-text-muted)]">
            {item.body}
          </p>
        </div>
      </div>
    </Card>
  );
}
