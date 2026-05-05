import { create } from "zustand";
import type { Message } from "@/entities/message";
import { scheduleMockReply } from "../lib/mockBuddyReply";

interface ChatSessionState {
  conversationId: string | null;
  messages: Message[];
  isPending: boolean;
  init: (conversationId: string, seed?: Message[]) => void;
  send: (text: string) => void;
  clear: () => void;
}

export const useChatSessionStore = create<ChatSessionState>()((set, get) => ({
  conversationId: null,
  messages: [],
  isPending: false,
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
