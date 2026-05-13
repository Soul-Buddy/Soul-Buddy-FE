"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findBuddy, type BuddyId } from "@/entities/buddy";
import { useChatSetupStore } from "@/features/chat/select-buddy";
import { useChatSessionStore } from "@/features/chat/send-message";
import { ChatHeader, Composer, MessageThread } from "@/widgets/chat-window";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { MOCK_DEMO_MESSAGES } from "@/shared/api/mock/fixtures";

interface ChatViewProps {
  conversationId: string;
}

/**
 * 채팅 뷰 컴포넌트
 * @param param0 // 
 * @returns 
 */
export function ChatView({ conversationId }: ChatViewProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const buddyId = useChatSetupStore((s) => s.buddyId); // 채팅 상대방 ID (예: "poco", "lumi")
  const resetSetup = useChatSetupStore((s) => s.reset); // 채팅 설정 초기화 함수

  const messages = useChatSessionStore((s) => s.messages); // 현재 대화 세션의 메시지 목록
  const isPending = useChatSessionStore((s) => s.isPending); // 메시지 전송 대기 상태 (true: 전송 중, false: 전송 가능)
  const init = useChatSessionStore((s) => s.init); // 대화 세션 초기화 함수 (conversationId와 seed 메시지 목록을 인자로 받음)
  const send = useChatSessionStore((s) => s.send); // 메시지 전송 함수 (사용자가 입력한 메시지를 인자로 받음)
  const clear = useChatSessionStore((s) => s.clear); // 대화 세션 초기화 함수 (세션 상태를 초기 상태로 리셋)

  const isExisting = conversationId.startsWith("conv-") || conversationId.startsWith("hist-"); // 기존 대화 세션인지 여부를 판단 (conversationId가 "conv-" 또는 "hist-"로 시작하면 기존 세션으로 간주)
  const seed = isExisting
    ? MOCK_DEMO_MESSAGES.map((m) => ({ ...m, conversationId }))
    : []; // 대화 세션 초기화 시 사용할 시드 메시지 목록 (기존 세션이면 MOCK_DEMO_MESSAGES를 conversationId에 맞게 변형하여 사용, 신규 세션이면 빈 배열)

  const effectiveBuddyId: BuddyId = buddyId ?? "poco"; // 채팅 상대방 ID (buddyId가 null인 경우 기본값으로 "poco" 사용)
  const buddy = findBuddy(effectiveBuddyId); // buddyId에 해당하는 Buddy 객체를 조회 (findBuddy 함수는 entities/buddy/model에서 정의된 함수로, BuddyId를 인자로 받아 해당하는 Buddy 객체를 반환)

  // 컴포넌트가 마운트될 때 대화 세션을 초기화 (conversationId와 seed 메시지 목록을 인자로 전달)
  useEffect(() => {
    init(conversationId, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // "끝내기" 확정 시 대화 세션을 초기화하고 채팅 설정을 리셋한 후 홈으로 이동
  const handleEndConfirm = () => {
    setConfirmOpen(false);
    clear();
    resetSetup();
    router.replace("/");
  };

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg)]">
      {/* 채팅 헤더 */}
      <ChatHeader buddy={buddy} onAction={() => setConfirmOpen(true)} />
      {/* 메시지 스레드 */}
      <div className="flex-1 overflow-y-auto px-5">
        <MessageThread messages={messages} buddy={buddy} isPending={isPending} />
      </div>
      {/* 채팅 입력 영역 */}
      <div className="sticky bottom-0 border-t border-border-strong bg-[var(--color-bg)] px-5 pt-3 pb-5">
        <Composer onSend={send} disabled={isPending} />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="대화를 끝내시겠어요?"
        confirmLabel="끝내기"
        onConfirm={handleEndConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}
