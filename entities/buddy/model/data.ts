import buddyImage from "@/shared/assets/helloIcon.png";
import type { Buddy, BuddyId } from "./types";

// TODO(asset): 디자이너로부터 포코/루미 개별 일러스트 받으면 교체
export const BUDDIES: Buddy[] = [
  {
    id: "poco",
    name: "포코",
    type: "공감형",
    trait: "따뜻함",
    tags: ["따뜻", "공감"],
    description: "포코는 먼저 당신의 기분을 물어보고, 부드럽게 공감하는 스타일이에요.",
    image: buddyImage,
  },
  {
    id: "lumi",
    name: "루미",
    type: "성찰형",
    trait: "차분함",
    tags: ["차분", "성찰"],
    description: "루미는 차분히 질문을 건네며 함께 생각을 정리해주는 스타일이에요.",
    image: buddyImage,
  },
];

export function findBuddy(id: BuddyId): Buddy {
  const buddy = BUDDIES.find((b) => b.id === id);
  if (!buddy) throw new Error(`Unknown buddy id: ${id}`);
  return buddy;
}
