"use client";

import { useEffect, useMemo, useRef } from "react";
import { MessageBubble, type Message } from "@/entities/message";
import type { Buddy } from "@/entities/buddy";

interface MessageThreadProps {
  messages: Message[];
  buddy: Buddy;
  isPending?: boolean;
}

function formatGroupLabel(iso: string): string {
  const d = new Date(iso);
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "오후" : "오전";
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `오늘 ${period} ${h12}:${minutes}`;
}

export function MessageThread({ messages, buddy, isPending }: MessageThreadProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isPending]);

  const firstLabel = useMemo(
    () => (messages.length > 0 ? formatGroupLabel(messages[0].createdAt) : null),
    [messages]
  );

  return (
    <div className="flex flex-col gap-3 py-4">
      {firstLabel && (
        <div className="text-center text-xs text-[var(--color-text-muted)]">
          {firstLabel}
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          buddyAvatar={buddy.image}
          buddyName={buddy.name}
        />
      ))}
      {isPending && (
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]" />
          {buddy.name}이 답하고 있어요…
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
