"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import helloIcon from "@/shared/assets/helloIcon.png";
import { TopBar } from "@/shared/ui/TopBar";
import { BackButton } from "@/shared/ui/BackButton";
import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { TextField } from "@/shared/ui/TextField";
import {
  GenderToggle,
  UsagePurposeList,
  useProfileFormStore,
} from "@/features/onboarding/profile-form";
import { saveProfileMock } from "@/shared/api/mock/profileStorage";

export function ProfileView() {
  const router = useRouter();
  const draft = useProfileFormStore((s) => s.draft); // 프로필 폼의 임시 저장 상태
  const setName = useProfileFormStore((s) => s.setName); // 이름 설정 함수
  const setAge = useProfileFormStore((s) => s.setAge); // 나이 설정 함수
  const setGender = useProfileFormStore((s) => s.setGender); // 성별 설정 함수
  const togglePurpose = useProfileFormStore((s) => s.togglePurpose); // 사용 목적 토글 함수
  const isValid = useProfileFormStore((s) => s.isValid)(); // 폼 유효성 검사 결과
  const reset = useProfileFormStore((s) => s.reset); // 폼 초기화 함수

  // 폼 제출 핸들러 
  const handleSubmit = () => {
    if (!isValid || draft.gender === null) return; // 폼이 유효하지 않거나 성별이 선택되지 않은 경우 제출 중단
    saveProfileMock({ // 프로필 저장을 시뮬레이션하는 함수 호출
      id: crypto.randomUUID(), 
      name: draft.name.trim(),
      age: Number(draft.age),
      gender: draft.gender,
      usagePurposes: draft.usagePurposes,
    });
    reset();
    router.replace("/");
  };

  return (
    <Screen
      header={<TopBar leading={<BackButton fallbackHref="/onboarding/terms" />} />}
      footer={
        <div className="flex gap-3 border-t border-border-strong -mx-5 px-5 py-3">
          <Button variant="secondary" size="lg" onClick={() => router.back()} className="min-w-24">
            이전
          </Button>
          <Button variant="primary" size="lg" fullWidth disabled={!isValid} onClick={handleSubmit}>
            다음으로
          </Button>
        </div>
      }
    >
      <section className="mt-2 flex items-center gap-3">
        <Image src={helloIcon} alt="" width={48} height={48} className="shrink-0 object-contain" />
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] leading-[1.35] font-bold text-text">
            만나서 반가워요!
          </h1>
          <span className="text-[13px] text-text-muted">
            몇 가지만 알려주시면 더 잘 들어드릴 수 있어요
          </span>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-5">
        <TextField
          label="이름"
          placeholder="이름을 입력해주세요!"
          value={draft.name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="나이"
          placeholder="나이를 입력해주세요!"
          value={draft.age}
          maxLength={3}
          inputMode="numeric"
          onChange={(e) => setAge(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <span className="text-[15px] font-medium text-[var(--color-text)]">성별</span>
          <GenderToggle value={draft.gender} onChange={setGender} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[15px] font-medium text-[var(--color-text)]">
            이 앱을 어떻게 쓰고 싶으세요?
          </span>
          <UsagePurposeList selected={draft.usagePurposes} onToggle={togglePurpose} />
        </div>
      </div>
    </Screen>
  );
}
