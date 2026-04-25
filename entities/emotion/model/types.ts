export type EmotionId =
  | "tired"
  | "anxious"
  | "lethargic"
  | "comfortable"
  | "excited"
  | "lonely"
  | "frustrated"
  | "hopeful"
  | "angry";

export interface Emotion {
  id: EmotionId;
  label: string;
  colorVar: string;
}
