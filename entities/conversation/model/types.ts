import type { BuddyId } from "@/entities/buddy";

export type ConversationDotColor =
  | "peach"
  | "blue"
  | "sage"
  | "rose"
  | "coral";

export interface Conversation {
  id: string;
  title: string;
  buddyId: BuddyId;
  dateLabel: string;
  dotColor: ConversationDotColor;
  emotionFromLabel?: string;
  emotionToLabel?: string;
}
