export const MOCK_USER_NAME = "세아";

export const EMERGENCY_HOTLINES = [
  { id: "109", number: "109" },
  { id: "1388", number: "1388" },
  { id: "1577", number: "1577" },
] as const;

export const MOCK_RECENT_CONVERSATIONS = [
  {
    id: "conv-1",
    title: "자존감, 진로",
    buddyId: "poco" as const,
    dateLabel: "어제 · 포코와",
    dotColor: "peach" as const,
  },
  {
    id: "conv-2",
    title: "자존감, 진로",
    buddyId: "poco" as const,
    dateLabel: "어제 · 포코와",
    dotColor: "peach" as const,
  },
];

export const MOCK_HISTORY_CONVERSATIONS = [
  {
    id: "hist-1",
    title: "자존감, 진로",
    buddyId: "poco" as const,
    dateLabel: "어제",
    dotColor: "peach" as const,
    emotionFromLabel: "따뜻",
    emotionToLabel: "편안",
  },
  {
    id: "hist-2",
    title: "학업 스트레스",
    buddyId: "lumi" as const,
    dateLabel: "4월 20일",
    dotColor: "blue" as const,
    emotionFromLabel: "답답",
    emotionToLabel: "무덤덤",
  },
  {
    id: "hist-3",
    title: "인간 관계, 외로움",
    buddyId: "poco" as const,
    dateLabel: "4월 18일",
    dotColor: "rose" as const,
    emotionFromLabel: "외로",
    emotionToLabel: "약간 안정",
  },
  {
    id: "hist-4",
    title: "미래에 대한 불안",
    buddyId: "lumi" as const,
    dateLabel: "4월 15일",
    dotColor: "sage" as const,
    emotionFromLabel: "불안",
    emotionToLabel: "차분",
  },
];

export const MOCK_CENTERS = [
  {
    id: "center-1",
    name: "마음돌봄 상담센터",
    address: "원주 단구동",
    distanceM: 420,
    tags: ["청소년/청년"],
    hours: "평일 09 ~ 18",
    phone: "0331234567",
  },
  {
    id: "center-2",
    name: "마음돌봄 상담센터",
    address: "원주 단구동",
    distanceM: 420,
    tags: ["청소년/청년"],
    hours: "평일 09 ~ 18",
    phone: "0331234568",
  },
  {
    id: "center-3",
    name: "마음돌봄 상담센터",
    address: "원주 단구동",
    distanceM: 420,
    tags: ["청소년/청년"],
    hours: "평일 09 ~ 18",
    phone: "0331234569",
  },
];

export const MOCK_DEMO_MESSAGES = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    role: "buddy" as const,
    text: "오늘 하루 어떠셨어요? 괜찮은 순간도, 조금 힘들었던 순간도 함께 있었을 것 같아요.",
    createdAt: "2026-04-25T18:42:00.000Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    role: "user" as const,
    text: "오늘따라 아무것도 하기 싫어요. 이유도 잘 모르겠어요.",
    createdAt: "2026-04-25T18:43:00.000Z",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    role: "buddy" as const,
    text: "이유를 모르는 무기력함이 들 때, 몸과 마음이 쉬라고 말하는 걸 수도 있어요. 오늘 혹시 제일 먼저 떠오르는 단어가 있나요?",
    createdAt: "2026-04-25T18:44:00.000Z",
  },
];

export const MOCK_BUDDY_REPLIES = [
  "그 마음, 천천히 더 말씀해 주실래요?",
  "잠깐 숨을 고르고 와도 괜찮아요. 저는 여기 있을게요.",
  "그렇게 느끼는 데에는 분명 이유가 있을 거예요.",
  "오늘 하루 중 작은 따뜻함이 있었다면 어떤 순간이었나요?",
];
