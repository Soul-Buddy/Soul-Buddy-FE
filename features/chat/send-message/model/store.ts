import { create } from "zustand";
import type { Message } from "@/entities/message";
import { scheduleMockReply } from "../lib/mockBuddyReply";

interface ChatSessionState {
  conversationId: string | null; // 현재 대화 세션의 ID (예: "conv-123", "hist-456"), 초기값은 null (세션 없음)
  messages: Message[]; // 현재 대화 세션의 메시지 목록, 초기값은 빈 배열
  isPending: boolean; // 메시지 전송 대기 상태, true: 메시지 전송 중 (사용자 입력 후 응답 대기), false: 메시지 전송 가능 (응답 완료 또는 초기 상태)
  init: (conversationId: string, seed?: Message[]) => void; // 대화 세션 초기화 함수, conversationId와 선택적으로 seed 메시지 목록을 인자로 받아 세션 상태를 초기화
  send: (text: string) => void; // 메시지 전송 함수, 사용자가 입력한 텍스트를 인자로 받아 메시지 목록에 사용자 메시지를 추가하고, mockBuddyReply를 통해 일정 시간 후에 봇의 응답 메시지를 추가
  clear: () => void; // 대화 세션 초기화 함수, conversationId를 null로, messages를 빈 배열로, isPending을 false로 리셋하여 세션 상태를 초기 상태로 만듦
}

/**
 * 채팅 세션 스토어 (현재 대화 세션의 상태를 관리)
 */
export const useChatSessionStore = create<ChatSessionState>()((set, get) => ({
  conversationId: null, // 현재 대화 세션의 ID, 초기값은 null (세션 없음)
  messages: [], // 현재 대화 세션의 메시지 목록, 초기값은 빈 배열
  isPending: false, // 메시지 전송 대기 상태, 초기값은 false (메시지 전송 가능)
  // 대화 세션 초기화 함수, conversationId와 선택적으로 seed 메시지 목록을 인자로 받아 세션 상태를 초기화
  init: (conversationId, seed = []) => {
    if (get().conversationId === conversationId) return;
    set({ conversationId, messages: seed, isPending: false });
  },
  send: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const conversationId = get().conversationId ?? "draft";
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      role: "user",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      messages: [...state.messages, userMsg],
      isPending: true,
    }));
    scheduleMockReply((replyText) => {
      const buddyMsg: Message = {
        id: `msg-${Date.now()}-r`,
        conversationId,
        role: "buddy",
        text: replyText,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({
        messages: [...state.messages, buddyMsg],
        isPending: false,
      }));
    });
  },
  clear: () => set({ conversationId: null, messages: [], isPending: false }),
}));
