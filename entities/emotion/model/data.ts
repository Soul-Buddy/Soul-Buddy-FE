import type { Emotion, EmotionId } from "./types";

export const EMOTIONS: Emotion[] = [
  { id: "tired", label: "피곤함", colorVar: "var(--color-emotion-blue)" },
  { id: "anxious", label: "불안함", colorVar: "var(--color-emotion-pink)" },
  { id: "lethargic", label: "무기력", colorVar: "var(--color-emotion-sage)" },
  { id: "comfortable", label: "편안함", colorVar: "var(--color-emotion-peach)" },
  { id: "excited", label: "설렘", colorVar: "var(--color-emotion-coral)" },
  { id: "lonely", label: "외로움", colorVar: "var(--color-emotion-mint)" },
  { id: "frustrated", label: "답답함", colorVar: "var(--color-emotion-beige)" },
  { id: "hopeful", label: "희망", colorVar: "var(--color-emotion-cream)" },
  { id: "angry", label: "화남", colorVar: "var(--color-emotion-rose)" },
];

export function findEmotion(id: EmotionId): Emotion {
  const emotion = EMOTIONS.find((e) => e.id === id);
  if (!emotion) throw new Error(`Unknown emotion id: ${id}`);
  return emotion;
}
