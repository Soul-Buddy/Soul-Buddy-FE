"use client";

import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { Emotion } from "../model/types";

interface EmotionCellProps {
  emotion: Emotion;
  selected?: boolean;
  onClick?: () => void;
}

export function EmotionCell({ emotion, selected = false, onClick }: EmotionCellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{ backgroundColor: emotion.colorVar }}
      className={cn(
        "relative flex aspect-square w-full items-end justify-start rounded-[var(--radius-md)] p-3 text-left transition-all",
        selected ? "ring-2 ring-[var(--color-text)] ring-offset-2 ring-offset-[var(--color-bg)]" : "hover:opacity-90",
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-text)] text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}
      <span className="text-[15px] font-semibold text-[var(--color-text)]">{emotion.label}</span>
    </button>
  );
}
