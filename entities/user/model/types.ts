export type Gender = "female" | "male";

export type UsagePurpose =
  | "emotional-support"
  | "self-reflection"
  | "stress-relief"
  | "sleep-help";

export interface UsagePurposeOption {
  id: UsagePurpose;
  label: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  usagePurposes: UsagePurpose[];
}

export interface UserProfileDraft {
  name: string;
  age: string;
  gender: Gender | null;
  usagePurposes: UsagePurpose[];
}
