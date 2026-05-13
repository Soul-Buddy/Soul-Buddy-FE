"use client";

import { useRouter } from "next/navigation";
import { ConversationCard, type Conversation } from "@/entities/conversation";

interface HistoryListProps {
  conversations: Conversation[];
}

export function HistoryList({ conversations }: HistoryListProps) {
  const router = useRouter();

  if (conversations.length === 0) {
    return (
      <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
        아직 기록된 대화가 없어요.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {conversations.map((conv) => (
        <ConversationCard
          key={conv.id}
          conversation={conv}
          variant="detailed"
          onClick={() => router.push(`/chat/${conv.id}`)}
        />
      ))}
    </div>
  );
}
