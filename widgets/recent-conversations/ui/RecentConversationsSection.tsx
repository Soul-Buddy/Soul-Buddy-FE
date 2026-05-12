"use client";

import { useRouter } from "next/navigation";
import { ConversationCard, type Conversation } from "@/entities/conversation";

interface RecentConversationsSectionProps {
  conversations: Conversation[];
}

export function RecentConversationsSection({
  conversations,
}: RecentConversationsSectionProps) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold text-[var(--color-text)]">
        최근 이야기
      </h2>
      {conversations.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)]">
          아직 대화 기록이 없어요. 첫 대화를 시작해 보세요.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {conversations.map((conv) => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              onClick={() => router.push(`/chat/${conv.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
