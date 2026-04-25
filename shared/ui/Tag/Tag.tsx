import { type HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type TagTone = "neutral" | "primary" | "muted" | "dark";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
}

const toneClass: Record<TagTone, string> = {
  neutral: "bg-[var(--color-surface)] text-[var(--color-text-muted)]",
  primary: "bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)]",
  muted: "bg-[var(--color-surface-strong)] text-[var(--color-text-muted)]",
  dark: "bg-white/10 text-white",
};

export function Tag({ className, tone = "neutral", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
