"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import helloIcon from "@/shared/assets/helloIcon.png";
import { AppHeader } from "@/shared/ui/AppHeader";
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
  const draft = useProfileFormStore((s) => s.draft);
  const setName = useProfileFormStore((s) => s.setName);
  const setAge = useProfileFormStore((s) => s.setAge);
  const setGender = useProfileFormStore((s) => s.setGender);
  const togglePurpose = useProfileFormStore((s) => s.togglePurpose);
  const isValid = useProfileFormStore((s) => s.isValid)();
  const reset = useProfileFormStore((s) => s.reset);

  const handleSubmit = () => {
    if (!isValid || draft.gender === null) return;
    saveProfileMock({
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
      header={<AppHeader leading={<BackButton fallbackHref="/onboarding/terms" />} />}
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" size="lg" onClick={() => router.back()} className="min-w-24">
            이전
          </Button>
          <Button variant="primary" size="lg" fullWidth disabled={!isValid} onClick={handleSubmit}>
            다음으로
          </Button>
        </div>
      }
    >
      <section className="mt-2 flex flex-col gap-2">
        <h1 className="text-[22px] leading-[1.35] font-bold text-[var(--color-text)]">
          만나서 반가워요!
        </h1>
        <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-muted)]">
          <Image src={helloIcon} alt="" width={24} height={24} className="object-contain" />
          <span>몇 가지만 알려주시면 더 잘 들어드릴 수 있어요</span>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-5">
        <TextField
          label="이름"
          placeholder="홍길동"
          value={draft.name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="나이"
          placeholder="25"
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
