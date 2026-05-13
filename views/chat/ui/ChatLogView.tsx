"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findBuddy, type BuddyId } from "@/entities/buddy";
import { ChatHeader, MessageThread } from "@/widgets/chat-window";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import {
  MOCK_DEMO_MESSAGES,
  MOCK_HISTORY_CONVERSATIONS,
} from "@/shared/api/mock/fixtures";

interface ChatLogViewProps {
  conversationId: string;
}

/**
 * 채팅 기록 조회 뷰 (읽기 전용)
 * - 메시지 입력창 없음
 * - 헤더의 액션 버튼은 "삭제" (확인 모달 → 확정 시 /history 로 이동)
 */
export function ChatLogView({ conversationId }: ChatLogViewProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const conversation = MOCK_HISTORY_CONVERSATIONS.find(
    (c) => c.id === conversationId,
  );
  const buddyId: BuddyId = conversation?.buddyId ?? "poco";
  const buddy = findBuddy(buddyId);

  const messages = MOCK_DEMO_MESSAGES.map((m) => ({ ...m, conversationId }));

  const handleDelete = () => {
    // TODO(api): 실제 삭제 API 연결
    setConfirmOpen(false);
    router.replace("/history");
  };

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg)]">
      <ChatHeader
        buddy={buddy}
        actionLabel="삭제"
        onAction={() => setConfirmOpen(true)}
      />
      <div className="flex-1 overflow-y-auto px-5">
        <MessageThread messages={messages} buddy={buddy} />
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="정말 삭제할까요?"
        description="복구할 수 없어요."
        confirmLabel="삭제"
        variant="danger"
        onConfirm={handleDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}
