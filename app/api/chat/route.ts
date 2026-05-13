import { NextResponse } from "next/server";
import { USAGE_PURPOSE_OPTIONS } from "@/entities/user/model/data";
import type { Gender, UsagePurpose } from "@/entities/user";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

interface ChatRequestMessage {
  role: "user" | "buddy";
  text: string;
}

interface ChatRequestProfile {
  name?: string;
  age?: number;
  gender?: Gender;
  usagePurposes?: UsagePurpose[];
}

interface ChatRequestBody {
  messages: ChatRequestMessage[];
  profile?: ChatRequestProfile | null;
}

const GENDER_LABEL: Record<Gender, string> = {
  female: "여성",
  male: "남성",
};

function buildSystemInstruction(profile?: ChatRequestProfile | null): string {
  const base = `당신은 청년들의 마음 건강을 돕는 따뜻하고 다정한 상담 친구입니다.
- 짧고 자연스럽게, 1~3문장으로 답합니다.
- 판단하거나 훈계하지 않습니다. 사용자의 감정을 먼저 공감합니다.
- 해결책을 강요하지 않고, 사용자가 스스로 말할 수 있도록 부드러운 질문을 곁들입니다.
- 의료적/법률적 조언이나 자해·자살 관련 위기 신호에는 안전 안내(자살예방상담전화 109, 정신건강상담 1577-0199)를 권유합니다.`;

  if (!profile?.name) return base;

  const purposeLabels = (profile.usagePurposes ?? [])
    .map((id) => USAGE_PURPOSE_OPTIONS.find((o) => o.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const genderLabel = profile.gender ? GENDER_LABEL[profile.gender] : "";
  const ageLabel = profile.age ? `${profile.age}세` : "";
  const demographic = [ageLabel, genderLabel].filter(Boolean).join(" ");

  const profileLine = `- 사용자 정보: ${profile.name}님${demographic ? `, ${demographic}` : ""}${purposeLabels ? `. 이용 목적: ${purposeLabels}` : ""}.`;

  return `${base}\n${profileLine}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
  }

  const body = (await request.json()) as ChatRequestBody;
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  const contents = body.messages.map((m) => ({
    role: m.role === "buddy" ? "model" : "user",
    parts: [{ text: m.text }],
  }));

  const payload = {
    system_instruction: {
      parts: [{ text: buildSystemInstruction(body.profile) }],
    },
    contents,
  };

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", response.status, errorText);
    return NextResponse.json({ error: "Gemini API request failed" }, { status: 502 });
  }

  const data = await response.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) {
    return NextResponse.json({ error: "Empty response from Gemini" }, { status: 502 });
  }

  return NextResponse.json({ text });
}
