"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Gender, UsagePurpose, UserProfileDraft } from "@/entities/user";

interface ProfileFormState {
  draft: UserProfileDraft;
  setName: (value: string) => void;
  setAge: (value: string) => void;
  setGender: (value: Gender) => void;
  togglePurpose: (purpose: UsagePurpose) => void;
  reset: () => void;
  isValid: () => boolean;
}

const initialDraft: UserProfileDraft = {
  name: "",
  age: "",
  gender: null,
  usagePurposes: [],
};

export const useProfileFormStore = create<ProfileFormState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      setName: (value) =>
        set((state) => ({ draft: { ...state.draft, name: value.slice(0, 20) } })),
      setAge: (value) =>
        set((state) => ({
          draft: { ...state.draft, age: value.replace(/\D/g, "").slice(0, 3) },
        })),
      setGender: (value) =>
        set((state) => ({ draft: { ...state.draft, gender: value } })),
      togglePurpose: (purpose) =>
        set((state) => {
          const has = state.draft.usagePurposes.includes(purpose);
          return {
            draft: {
              ...state.draft,
              usagePurposes: has
                ? state.draft.usagePurposes.filter((p) => p !== purpose)
                : [...state.draft.usagePurposes, purpose],
            },
          };
        }),
      reset: () => set({ draft: initialDraft }),
      isValid: () => {
        const { name, age, gender, usagePurposes } = get().draft;
        const ageNum = Number(age);
        return (
          name.trim().length > 0 &&
          age.length > 0 &&
          ageNum > 0 &&
          ageNum < 130 &&
          gender !== null &&
          usagePurposes.length > 0
        );
      },
    }),
    { name: "soulbuddy:profile-draft" },
  ),
);
