"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { findBuddy, type BuddyId } from "@/entities/buddy";
import { useChatSetupStore } from "@/features/chat/select-buddy";
import { useChatSessionStore } from "@/features/chat/send-message";
import { ChatHeader, Composer, MessageThread } from "@/widgets/chat-window";
import { MOCK_DEMO_MESSAGES } from "@/shared/api/mock/fixtures";

interface ChatViewProps {
  conversationId: string;
}

export function ChatView({ conversationId }: ChatViewProps) {
  const router = useRouter();
  const buddyId = useChatSetupStore((s) => s.buddyId);
  const resetSetup = useChatSetupStore((s) => s.reset);

  const messages = useChatSessionStore((s) => s.messages);
  const isPending = useChatSessionStore((s) => s.isPending);
  const init = useChatSessionStore((s) => s.init);
  const send = useChatSessionStore((s) => s.send);
  const clear = useChatSessionStore((s) => s.clear);

  const isExisting = conversationId.startsWith("conv-") || conversationId.startsWith("hist-");
  const seed = isExisting
    ? MOCK_DEMO_MESSAGES.map((m) => ({ ...m, conversationId }))
    : [];

  const effectiveBuddyId: BuddyId = buddyId ?? "poco";
  const buddy = findBuddy(effectiveBuddyId);

  useEffect(() => {
    init(conversationId, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const handleEnd = () => {
    if (typeof window !== "undefined" && !window.confirm("대화를 끝내시겠어요?")) {
      return;
    }
    clear();
    resetSetup();
    router.replace("/");
  };

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg)]">
      <ChatHeader buddy={buddy} onEnd={handleEnd} />
      <div className="flex-1 overflow-y-auto px-5">
        <MessageThread messages={messages} buddy={buddy} isPending={isPending} />
      </div>
      <div className="sticky bottom-0 bg-[var(--color-bg)] px-5 pt-2 pb-5">
        <Composer onSend={send} disabled={isPending} />
      </div>
    </div>
  );
}
