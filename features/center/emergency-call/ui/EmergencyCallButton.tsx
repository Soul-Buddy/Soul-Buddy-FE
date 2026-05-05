import { Phone } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface EmergencyCallButtonProps {
  number: string;
  label?: string;
}

export function EmergencyCallButton({ number, label }: EmergencyCallButtonProps) {
  return (
    <a
      href={`tel:${number}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)]",
        "bg-white/15 px-3 py-1.5 text-sm font-semibold text-white",
        "hover:bg-white/25 transition-colors"
      )}
    >
      <Phone className="h-3.5 w-3.5" />
      <span>{label ?? number}</span>
    </a>
  );
}
