import { BuddyView } from "@/views/chat-setup/buddy";

/**
 * 새로운 대화 생성 페이지 - 버디 선택 단계
 * - 사용자가 대화를 시작하기 전에 버디를 선택할 수 있는 페이지
 * - 선택된 버디에 따라 이후 대화 설정이 달라질 수 있음
 * @returns 
 */
export default function ChatNewBuddyPage() {
  return <BuddyView />;
}
