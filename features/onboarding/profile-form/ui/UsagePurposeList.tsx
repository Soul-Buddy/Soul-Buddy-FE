"use client";

import { BookOpen, Check, Heart, Moon, Wind, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Card } from "@/shared/ui/Card";
import { USAGE_PURPOSE_OPTIONS, type UsagePurpose } from "@/entities/user";

const ICON_CONFIG: Record<
  UsagePurpose,
  { icon: LucideIcon; bgClass: string; colorClass: string }
> = {
  "emotional-support": { icon: Heart, bgClass: "bg-emotion-pink", colorClass: "text-rose-600" },
  "self-reflection": { icon: BookOpen, bgClass: "bg-emotion-sage", colorClass: "text-emerald-700" },
  "stress-relief": { icon: Wind, bgClass: "bg-emotion-blue", colorClass: "text-sky-700" },
  "sleep-help": { icon: Moon, bgClass: "bg-emotion-cream", colorClass: "text-amber-700" },
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
        const { icon: Icon, bgClass, colorClass } = ICON_CONFIG[opt.id];
        return (
          <button key={opt.id} type="button" onClick={() => onToggle(opt.id)} className="block w-full text-left">
            <Card
              surface="default"
              padding="lg"
              className={cn(
                "flex items-center gap-3 transition-all",
                isSelected && "bg-primary-soft/60 ring-2 ring-primary",
              )}
            >
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-sm", bgClass)}>
                <Icon className={cn("h-6 w-6", colorClass)} strokeWidth={2.2} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-text">{opt.label}</span>
                <span className="text-xs text-text-muted">{opt.description}</span>
              </div>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  isSelected ? "bg-primary text-white" : "border border-border-strong text-transparent",
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
