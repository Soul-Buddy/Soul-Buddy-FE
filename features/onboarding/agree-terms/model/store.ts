"use client";

import { create } from "zustand";

interface TermsState {
  isAgreed: boolean;
  setAgreed: (value: boolean) => void;
  reset: () => void;
}

export const useTermsStore = create<TermsState>((set) => ({
  isAgreed: false,
  setAgreed: (value) => set({ isAgreed: value }),
  reset: () => set({ isAgreed: false }),
}));
