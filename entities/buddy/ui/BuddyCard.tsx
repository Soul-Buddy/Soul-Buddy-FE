"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { Tag } from "@/shared/ui/Tag";
import type { Buddy } from "../model/types";

interface BuddyCardProps {
  buddy: Buddy;
  selected?: boolean;
  tone?: "light" | "dark";
  onClick?: () => void;
}

export function BuddyCard({ buddy, selected = false, tone = "light", onClick }: BuddyCardProps) {
  const isDark = tone === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full flex-col items-center gap-3 rounded-[var(--radius-lg)] p-4 transition-all",
        isDark
          ? selected
            ? "bg-[var(--color-dark-soft)] ring-2 ring-white/40"
            : "bg-[var(--color-dark-soft)]/60 hover:bg-[var(--color-dark-soft)]"
          : selected
            ? "bg-white ring-2 ring-[var(--color-primary)]"
            : "bg-white hover:shadow-[var(--shadow-card)]",
      )}
    >
      <div className="flex h-28 w-full items-center justify-center">
        <Image
          src={buddy.image}
          alt={`${buddy.name} 캐릭터`}
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className={cn("text-lg font-bold", isDark ? "text-white" : "text-[var(--color-text)]")}>
          {buddy.name}
        </span>
        <span className={cn("text-xs", isDark ? "text-white/60" : "text-[var(--color-text-muted)]")}>
          {buddy.type} · {buddy.trait}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {buddy.tags.map((tag) => (
          <Tag key={tag} tone={isDark ? "dark" : "neutral"}>
            # {tag}
          </Tag>
        ))}
      </div>
    </button>
  );
}
