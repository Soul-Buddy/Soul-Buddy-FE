import type { BuddyId } from "@/entities/buddy";
import type { EmotionId } from "@/entities/emotion";
import { createPersistedStore } from "@/shared/lib/store/createStore";

interface ChatSetupState {
  buddyId: BuddyId | null;
  emotionId: EmotionId | null;
  setBuddy: (id: BuddyId) => void;
  setEmotion: (id: EmotionId) => void;
  reset: () => void;
}

export const useChatSetupStore = createPersistedStore<ChatSetupState>(
  (set) => ({
    buddyId: null,
    emotionId: null,
    setBuddy: (buddyId) => set({ buddyId }),
    setEmotion: (emotionId) => set({ emotionId }),
    reset: () => set({ buddyId: null, emotionId: null }),
  }),
  { name: "chat-setup" }
);
