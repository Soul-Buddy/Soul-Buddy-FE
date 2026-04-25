import type { StaticImageData } from "next/image";

export type BuddyId = "poco" | "lumi";

export type BuddyType = "공감형" | "성찰형";

export interface Buddy {
  id: BuddyId;
  name: string;
  type: BuddyType;
  trait: string;
  tags: string[];
  description: string;
  image: StaticImageData;
}
