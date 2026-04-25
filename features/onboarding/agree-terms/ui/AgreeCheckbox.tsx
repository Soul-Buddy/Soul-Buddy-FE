"use client";

import { Checkbox } from "@/shared/ui/Checkbox";
import { useTermsStore } from "../model/store";

export function AgreeCheckbox() {
  const isAgreed = useTermsStore((s) => s.isAgreed);
  const setAgreed = useTermsStore((s) => s.setAgreed);
  return (
    <Checkbox
      checked={isAgreed}
      onChange={(e) => setAgreed(e.target.checked)}
      label="세 가지 모두 이해했어요 (필수)"
    />
  );
}
