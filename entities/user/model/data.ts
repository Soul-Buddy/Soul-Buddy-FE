import type { UsagePurposeOption } from "./types";

export const USAGE_PURPOSE_OPTIONS: UsagePurposeOption[] = [
  {
    id: "emotional-support",
    label: "정서적 공감",
    description: "마음을 따뜻하게 들어주는 대화",
  },
  {
    id: "self-reflection",
    label: "차분한 자기 성찰",
    description: "오늘 하루를 돌아보고 정리하는 대화",
  },
  {
    id: "stress-relief",
    label: "스트레스 해소",
    description: "답답한 마음을 가볍게 풀어내는 대화",
  },
  {
    id: "sleep-help",
    label: "잠들기 전 정리",
    description: "하루를 마무리하는 조용한 대화",
  },
];
