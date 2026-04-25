"use client";

import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Card } from "@/shared/ui/Card";
import type { Conversation, ConversationDotColor } from "../model/types";

interface ConversationCardProps {
  conversation: Conversation;
  variant?: "compact" | "detailed";
  onClick?: () => void;
  onMenuClick?: () => void;
}

const dotClass: Record<ConversationDotColor, string> = {
  peach: "bg-[var(--color-emotion-peach)]",
  blue: "bg-[var(--color-emotion-blue)]",
  sage: "bg-[var(--color-emotion-sage)]",
  rose: "bg-[var(--color-emotion-rose)]",
  coral: "bg-[var(--color-emotion-coral)]",
};

export function ConversationCard({
  conversation,
  variant = "compact",
  onClick,
  onMenuClick,
}: ConversationCardProps) {
  const isDetailed = variant === "detailed";
  return (
    <Card surface="default" padding="md" shadow className="w-full">
      <button type="button" onClick={onClick} className="flex w-full items-start gap-3 text-left">
        <span className={cn("mt-2 h-2.5 w-2.5 shrink-0 rounded-full", dotClass[conversation.dotColor])} />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[var(--color-text-muted)]">{conversation.dateLabel}</span>
            {isDetailed && onMenuClick && (
              <span
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuClick();
                }}
                className="-m-2 inline-flex h-6 w-6 items-center justify-center text-[var(--color-text-muted)]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            )}
          </div>
          <span className="text-[15px] font-semibold text-[var(--color-text)]">
            {conversation.title}
          </span>
          {isDetailed && conversation.emotionFromLabel && conversation.emotionToLabel ? (
            <span className="text-xs text-[var(--color-text-muted)]">
              마지막 감정: {conversation.emotionFromLabel} → {conversation.emotionToLabel}
            </span>
          ) : (
            <span className="text-xs text-[var(--color-text-muted)]">{conversation.dateLabel}</span>
          )}
        </div>
        {!isDetailed && (
          <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[var(--color-text-subtle)]" />
        )}
      </button>
    </Card>
  );
}
