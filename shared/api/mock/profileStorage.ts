"use client";

import type { UserProfile } from "@/entities/user";

const PROFILE_STORAGE_KEY = "soulbuddy:profile";
const PROFILE_COOKIE = "profileCompleted";

export function saveProfileMock(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  document.cookie = `${PROFILE_COOKIE}=true; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function loadProfileMock(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function clearProfileMock(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
  document.cookie = `${PROFILE_COOKIE}=; path=/; max-age=0`;
}
