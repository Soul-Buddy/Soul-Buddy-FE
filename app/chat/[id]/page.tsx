import { ChatView } from "@/views/chat";
/**
 * 대화 페이지 컴포넌트 props 인터페이스
 * @property params - Next.js에서 제공하는 URL 파라미터 객체, 대화 ID를 포함
 */
interface ChatPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 대화 페이지 컴포넌트
 * @param param0 // URL 파라미터에서 대화 ID를 가져와 ChatView 컴포넌트에 전달
 * @returns 
 */
export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  return <ChatView conversationId={id} />;
}
