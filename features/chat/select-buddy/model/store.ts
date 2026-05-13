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

/**
 * 채팅 설정 스토어 (채팅 상대방과 감정 선택 상태를 관리)
 * - buddyId: 선택된 채팅 상대방 ID (예: "poco", "lumi"), 초기값은 null (선택 안 됨)
 * - emotionId: 선택된 감정 ID (예: "happy", "sad"), 초기값은 null (선택 안 됨)
 * - setBuddy: 채팅 상대방을 설정하는 함수, BuddyId를 인자로 받아 buddyId 상태를 업데이트
 * - setEmotion: 감정을 설정하는 함수, EmotionId를 인자로 받아 emotionId 상태를 업데이트
 * - reset: 채팅 설정을 초기화하는 함수, buddyId와 emotionId를 모두 null로 리셋
 * 이 스토어는 createPersistedStore로 생성되어 로컬 스토리지에 "chat-setup" 키로 저장됨
 * 사용 예시 : const buddyId = useChatSetupStore((s) => s.buddyId); // 현재 선택된 채팅 상대방 ID 조회
 *            const setBuddy = useChatSetupStore((s) => s.setBuddy); // 채팅 상대방 설정 함수 조회
 */
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
