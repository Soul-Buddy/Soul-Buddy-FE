import Image, { type StaticImageData } from "next/image";
import { cn } from "@/shared/lib/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | StaticImageData;
  alt: string;
  size?: AvatarSize;
  className?: string;
  background?: "surface" | "primary" | "transparent";
}

const sizeMap: Record<AvatarSize, { class: string; px: number }> = {
  sm: { class: "h-9 w-9", px: 36 },
  md: { class: "h-12 w-12", px: 48 },
  lg: { class: "h-16 w-16", px: 64 },
  xl: { class: "h-24 w-24", px: 96 },
};

const bgClass = {
  surface: "bg-[var(--color-surface)]",
  primary: "bg-[var(--color-primary-soft)]",
  transparent: "bg-transparent",
} as const;

export function Avatar({
  src,
  alt,
  size = "md",
  className,
  background = "surface",
}: AvatarProps) {
  const { class: sizeClass, px } = sizeMap[size];
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        bgClass[background],
        sizeClass,
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} width={px} height={px} className="object-cover" />
      ) : null}
    </div>
  );
}
