import lumiIcon from "@/shared/assets/lumi.png";
import pocoIcon from "@/shared/assets/poco.png";
import type { Buddy, BuddyId } from "./types";

// TODO(asset): 디자이너로부터 포코/루미 개별 일러스트 받으면 교체
export const BUDDIES: Buddy[] = [
  {
    id: "poco",
    name: "포코",
    type: "캐주얼형",
    trait: "캐주얼함",
    tags: ["편함", "친근함"],
    description: "포코는 캐주얼하게 당신과 대화를 나누는 스타일이에요.",
    image: pocoIcon,
  },
  {
    id: "lumi",
    name: "루미",
    type: "공감형",
    trait: "차분함",
    tags: ["차분", "공감"],
    description: "루미는 차분히 질문을 건네며 함께 생각을 정리해주는 스타일이에요.",
    image: lumiIcon,
  },
];

/**
 * 버디 ID로 버디 정보를 찾는 함수
 * @param id 찾고자 하는 버디의 ID
 * @returns 해당 ID를 가진 버디 객체
 * @throws 해당 ID를 가진 버디가 없을 경우 에러 발생
 */
export function findBuddy(id: BuddyId): Buddy {
  const buddy = BUDDIES.find((b) => b.id === id); // BUDDIES 배열에서 ID가 일치하는 버디 찾기
  if (!buddy) throw new Error(`Unknown buddy id: ${id}`);
  return buddy;
}
