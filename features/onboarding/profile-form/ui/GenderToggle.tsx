"use client";

import { cn } from "@/shared/lib/cn";
import type { Gender } from "@/entities/user";

interface GenderToggleProps {
  value: Gender | null;
  onChange: (value: Gender) => void;
}

const OPTIONS: { id: Gender; label: string }[] = [
  { id: "female", label: "여성" },
  { id: "male", label: "남성" },
];

export function GenderToggle({ value, onChange }: GenderToggleProps) {
  return (
    <div className="flex gap-3">
      {OPTIONS.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={selected}
            className={cn(
              "h-12 flex-1 rounded-[var(--radius-md)] border text-[15px] font-medium transition-colors",
              selected
                ? "border-transparent bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-muted)]",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
