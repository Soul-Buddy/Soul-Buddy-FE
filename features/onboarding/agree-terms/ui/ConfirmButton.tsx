"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { useTermsStore } from "../model/store";

export function ConfirmButton() {
  const router = useRouter();
  const isAgreed = useTermsStore((s) => s.isAgreed);
  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      disabled={!isAgreed}
      onClick={() => router.push("/onboarding/profile")}
    >
      동의하고 시작하기
    </Button>
  );
}
