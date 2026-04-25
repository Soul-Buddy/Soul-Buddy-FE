"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import heartIcon from "@/shared/assets/heartIcon.png";
import writeIcon from "@/shared/assets/writeIcon.png";
import radiowaveIcon from "@/shared/assets/radiowaveIcon.png";
import helloIcon from "@/shared/assets/helloIcon.png";
import { cn } from "@/shared/lib/cn";
import { Card } from "@/shared/ui/Card";
import { USAGE_PURPOSE_OPTIONS, type UsagePurpose } from "@/entities/user";

const ICON_BY_ID: Record<UsagePurpose, typeof heartIcon> = {
  "emotional-support": heartIcon,
  "self-reflection": writeIcon,
  "stress-relief": radiowaveIcon,
  "sleep-help": helloIcon,
};

interface UsagePurposeListProps {
  selected: UsagePurpose[];
  onToggle: (purpose: UsagePurpose) => void;
}

export function UsagePurposeList({ selected, onToggle }: UsagePurposeListProps) {
  return (
    <div className="flex flex-col gap-3">
      {USAGE_PURPOSE_OPTIONS.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <button key={opt.id} type="button" onClick={() => onToggle(opt.id)} className="block w-full text-left">
            <Card
              surface="default"
              padding="md"
              className={cn(
                "flex items-center gap-3 transition-all",
                isSelected ? "ring-2 ring-[var(--color-primary)]" : "",
              )}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary-soft)]/60">
                <Image src={ICON_BY_ID[opt.id]} alt="" width={20} height={20} className="object-contain" />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-[var(--color-text)]">{opt.label}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{opt.description}</span>
              </div>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  isSelected ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border-strong)] text-transparent",
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
