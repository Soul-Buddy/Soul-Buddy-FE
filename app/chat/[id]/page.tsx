import { ChatLogView, ChatView } from "@/views/chat";
/**
 * 대화 페이지 컴포넌트 props 인터페이스
 * @property params - Next.js에서 제공하는 URL 파라미터 객체, 대화 ID를 포함
 */
interface ChatPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 대화 페이지 컴포넌트
 * - `hist-` 접두사 ID는 종료된 기록 → ChatLogView (읽기 전용)
 * - 그 외는 진행 중 대화 → ChatView
 */
export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  if (id.startsWith("hist-")) {
    return <ChatLogView conversationId={id} />;
  }
  return <ChatView conversationId={id} />;
}
