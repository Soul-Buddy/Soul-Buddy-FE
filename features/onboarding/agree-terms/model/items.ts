import { Heart, PenLine, Shield, type LucideIcon } from "lucide-react";

export interface TermsItem {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  tone: "default" | "danger";
}

export const TERMS_ITEMS: TermsItem[] = [
  {
    id: "not-medical",
    title: "전문 의료는 아니에요",
    body: "포코·루미는 마음을 나누는 대화 친구예요. 진단이나 치료가 필요하다면 전문가를 연결해드릴게요.",
    icon: Heart,
    iconBgClass: "bg-emotion-pink",
    iconColorClass: "text-rose-600",
    tone: "default",
  },
  {
    id: "quiet-record",
    title: "대화는 조용히 기록돼요",
    body: "이전 이야기를 기억하려면 대화가 저장돼야 해요. 삭제 요청은 언제든 가능하고, 중요한 요약은 분리 보관돼요.",
    icon: PenLine,
    iconBgClass: "bg-emotion-mint",
    iconColorClass: "text-emerald-700",
    tone: "default",
  },
  {
    id: "safety-first",
    title: "안전이 먼저예요",
    body: "본인이나 누군가를 해치려는 생각이 감지되면 대화를 멈추고 바로 도움받을 수 있도록 안내해드려요.",
    icon: Shield,
    iconBgClass: "bg-emotion-coral",
    iconColorClass: "text-danger",
    tone: "danger",
  },
];
