export type MessageRole = "buddy" | "user";

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  text: string;
  createdAt: string;
}
