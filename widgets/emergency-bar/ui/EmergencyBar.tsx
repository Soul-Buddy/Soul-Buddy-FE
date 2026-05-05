import { AlertTriangle } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { EmergencyCallButton } from "@/features/center/emergency-call";
import { EMERGENCY_HOTLINES } from "@/shared/api/mock/fixtures";

export function EmergencyBar() {
  return (
    <Card surface="danger" padding="md" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-white" />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
          지금 즉시 도움
        </span>
      </div>
      <h3 className="text-[16px] font-bold leading-snug">긴급 상담 전화</h3>
      <div className="flex flex-wrap gap-2">
        {EMERGENCY_HOTLINES.map((hotline) => (
          <EmergencyCallButton key={hotline.id} number={hotline.number} />
        ))}
      </div>
    </Card>
  );
}
