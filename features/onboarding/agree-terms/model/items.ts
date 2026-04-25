import type { StaticImageData } from "next/image";
import heartIcon from "@/shared/assets/heartIcon.png";
import writeIcon from "@/shared/assets/writeIcon.png";
import radiowaveIcon from "@/shared/assets/radiowaveIcon.png";

export interface TermsItem {
  id: string;
  title: string;
  body: string;
  icon: StaticImageData;
  tone: "default" | "danger";
}

export const TERMS_ITEMS: TermsItem[] = [
  {
    id: "not-medical",
    title: "전문 의료는 아니에요",
    body: "포코·루미는 마음을 나누는 대화 친구예요. 진단이나 치료가 필요하다면 전문가를 연결해드릴게요.",
    icon: heartIcon,
    tone: "default",
  },
  {
    id: "quiet-record",
    title: "대화는 조용히 기록돼요",
    body: "이전 이야기를 기억하려면 대화가 저장돼야 해요. 삭제 요청은 언제든 가능하고, 중요한 요약은 분리 보관돼요.",
    icon: writeIcon,
    tone: "default",
  },
  {
    id: "safety-first",
    title: "안전이 먼저예요",
    body: "본인이나 누군가를 해치려는 생각이 감지되면 대화를 멈추고 바로 도움받을 수 있도록 안내해드려요.",
    icon: radiowaveIcon,
    tone: "danger",
  },
];
