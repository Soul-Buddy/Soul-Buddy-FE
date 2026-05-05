import { MOCK_BUDDY_REPLIES } from "@/shared/api/mock/fixtures";

export function pickMockReply(): string {
  const i = Math.floor(Math.random() * MOCK_BUDDY_REPLIES.length);
  return MOCK_BUDDY_REPLIES[i];
}

export function scheduleMockReply(onReply: (text: string) => void, delayMs = 700) {
  return setTimeout(() => onReply(pickMockReply()), delayMs);
}
