import Image, { type StaticImageData } from "next/image";
import { cn } from "@/shared/lib/cn";
import type { Message } from "../model/types";

interface MessageBubbleProps {
  message: Message;
  buddyAvatar?: StaticImageData;
  buddyName?: string;
}

export function MessageBubble({ message, buddyAvatar, buddyName }: MessageBubbleProps) {
  const isBuddy = message.role === "buddy";
  return (
    <div
      className={cn(
        "flex w-full items-end gap-2",
        isBuddy ? "justify-start" : "justify-end",
      )}
    >
      {isBuddy && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-surface)]">
          {buddyAvatar ? (
            <Image src={buddyAvatar} alt={buddyName ?? "버디"} width={32} height={32} className="object-cover" />
          ) : null}
        </div>
      )}
      <div
        className={cn(
          "max-w-[78%] rounded-[var(--radius-lg)] px-4 py-3 text-[14px] leading-[1.5]",
          isBuddy
            ? "rounded-tl-md bg-[var(--color-surface)] text-[var(--color-text)]"
            : "rounded-tr-md bg-[var(--color-primary-soft)] text-[var(--color-text)]",
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
