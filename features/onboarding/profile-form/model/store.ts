"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Gender, UsagePurpose, UserProfileDraft } from "@/entities/user";

/**
 * 프로필 폼 상태 관리 스토어 인터페이스
 */
interface ProfileFormState {
  draft: UserProfileDraft; // 프로필 폼의 임시 저장 상태를 나타내는 객체
  setName: (value: string) => void; // 이름을 설정하는 함수
  setAge: (value: string) => void; // 나이를 설정하는 함수
  setGender: (value: Gender) => void; // 성별을 설정하는 함수
  togglePurpose: (purpose: UsagePurpose) => void; // 사용 목적을 토글하는 함수 (목적이 이미 있으면 제거, 없으면 추가)
  reset: () => void; // 폼을 초기 상태로 리셋하는 함수
  isValid: () => boolean; // 현재 폼의 유효성을 검사하는 함수 (모든 필수 항목이 올바르게 입력되었는지 확인)
}

const initialDraft: UserProfileDraft = {
  // 프로필 폼의 초기 상태를 나타내는 객체
  name: "",
  age: "",
  gender: null,
  usagePurposes: [],
};

/**
 * 프로필 폼 상태 관리 스토어
 * - `draft`: 프로필 폼의 임시 저장 상태를 나타내는 객체
 * - `setName`, `setAge`, `setGender`: 각각 이름, 나이, 성별을 설정하는 함수
 * - `togglePurpose`: 사용 목적을 토글하는 함수 (목적이 이미 있으면 제거, 없으면 추가)
 * - `reset`: 폼을 초기 상태로 리셋하는 함수
 * - `isValid`: 현재 폼의 유효성을 검사하는 함수 (모든 필수 항목이 올바르게 입력되었는지 확인)
 * @example
 * const { draft, setName, setAge, setGender, togglePurpose, reset, isValid } = useProfileFormStore();
 * setName("홍길동");
 * setAge("25");
 * setGender("male");
 * togglePurpose("purpose1");
 * reset();
 * isValid();
 */
export const useProfileFormStore = create<ProfileFormState>()(
  persist(
    (set, get) => ({
      // 스토어의 상태와 함수를 정의하는 부분
      draft: initialDraft, // 프로필 폼의 임시 저장 상태를 초기 상태로 설정
      setName: (value) => set((state) => ({ draft: { ...state.draft, name: value.slice(0, 20) } })), // 이름은 최대 20자로 제한
      setAge: (
        value // 나이는 숫자만 허용하고 최대 3자리로 제한
      ) =>
        set((state) => ({
          // 입력값에서 숫자만 추출하고 최대 3자리로 자른 후 상태 업데이트
          draft: { ...state.draft, age: value.replace(/\D/g, "").slice(0, 3) },
        })),
      setGender: (value) => set((state) => ({ draft: { ...state.draft, gender: value } })), // 성별 설정 함수(값을 그대로 저장)
      // 사용 목적을 토글하는 함수 (목적이 이미 있으면 제거, 없으면 추가)
      togglePurpose: (purpose) =>
        // 현재 상태에서 사용 목적이 이미 포함되어 있는지 확인
        set((state) => {
          const has = state.draft.usagePurposes.includes(purpose); // 토글하려는 목적이 이미 포함되어 있는지 확인
          // 포함되어 있으면 제거, 포함되어 있지 않으면 추가하여 상태 업데이트
          return {
            draft: {
              ...state.draft, // 기존 드래프트 상태 유지
              usagePurposes: has // 토글하려는 목적이 이미 포함되어 있으면 제거, 그렇지 않으면 추가
                ? state.draft.usagePurposes.filter((p) => p !== purpose) // 포함되어 있으면 해당 목적을 제외한 새로운 배열 생성
                : [...state.draft.usagePurposes, purpose], // 포함되어 있지 않으면 기존 배열에 새로운 목적을 추가한 배열 생성
            },
          };
        }),
      // 폼을 초기 상태로 리셋하는 함수
      reset: () => set({ draft: initialDraft }),
      // 현재 폼의 유효성을 검사하는 함수 (모든 필수 항목이 올바르게 입력되었는지 확인)
      isValid: () => {
        const { name, age, gender, usagePurposes } = get().draft; // 현재 드래프트 상태에서 이름, 나이, 성별, 사용 목적을 추출
        const ageNum = Number(age); // 나이를 숫자로 변환하여 유효성 검사에 사용
        return (
          // 이름이 비어있지 않고, 나이가 숫자로 변환했을 때 0보다 크고 130보다 작은지, 성별이 선택되었는지, 사용 목적이 하나 이상 선택되었는지 확인
          name.trim().length > 0 &&
          age.length > 0 &&
          ageNum > 0 &&
          ageNum < 130 &&
          gender !== null &&
          usagePurposes.length > 0
        );
      },
    }),
    { name: "soulbuddy:profile-draft" } // 로컬 스토리지에 저장할 때 사용할 키 이름
  )
);
