"use client";

import { Avatar } from "@/shared/ui/Avatar";
import { BackButton } from "@/shared/ui/BackButton";
import { Button } from "@/shared/ui/Button";
import { Tag } from "@/shared/ui/Tag";
import type { Buddy } from "@/entities/buddy";

interface ChatHeaderProps {
  buddy: Buddy;
  onEnd: () => void;
}

export function ChatHeader({ buddy, onEnd }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2">
      <div className="flex items-center gap-2">
        <BackButton fallbackHref="/" />
        <Avatar src={buddy.image} alt={buddy.name} size="sm" background="primary" />
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold text-[var(--color-text)]">
            {buddy.name}
          </span>
          <div className="flex gap-1">
            {buddy.tags.map((tag) => (
              <Tag key={tag} tone="primary" className="px-2 py-0 text-[10px]">
                # {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onEnd}>
        끝내기
      </Button>
    </div>
  );
}
