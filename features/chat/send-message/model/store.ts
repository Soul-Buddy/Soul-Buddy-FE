import { create } from "zustand";
import type { Message } from "@/entities/message";
import { loadProfileMock } from "@/shared/api/mock/profileStorage";

interface ChatSessionState {
  conversationId: string | null;
  messages: Message[];
  isPending: boolean;
  init: (conversationId: string, seed?: Message[]) => void;
  send: (text: string) => void;
  clear: () => void;
}

async function fetchBuddyReply(messages: Message[]): Promise<string> {
  const profile = loadProfileMock();
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, text: m.text })),
      profile,
    }),
  });
  if (!res.ok) throw new Error("chat request failed");
  const data = (await res.json()) as { text: string };
  return data.text;
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

    fetchBuddyReply([...get().messages])
      .then((replyText) => {
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
      })
      .catch(() => {
        const errorMsg: Message = {
          id: `msg-${Date.now()}-e`,
          conversationId,
          role: "buddy",
          text: "지금 답하기 어려운 상황이에요. 잠시 후 다시 말씀해 주세요.",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          messages: [...state.messages, errorMsg],
          isPending: false,
        }));
      });
  },
  clear: () => set({ conversationId: null, messages: [], isPending: false }),
}));
