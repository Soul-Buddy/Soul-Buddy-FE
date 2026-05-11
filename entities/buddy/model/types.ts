import type { StaticImageData } from "next/image";

export type BuddyId = "poco" | "lumi";

export type BuddyType = "캐주얼형" | "공감형";

export interface Buddy {
  id: BuddyId;
  name: string;
  type: BuddyType;
  trait: string;
  tags: string[];
  description: string;
  image: StaticImageData;
}
