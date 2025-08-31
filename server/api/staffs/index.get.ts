import { defineEventHandler } from "h3";
import { staffs } from "../../static-data/staffs";

export type Staff = {
  name: string;
  avatarUrl: string;
  pinned?: boolean;
  socialUrls?: {
    x?: string;
    github?: string;
  };
};

export type Staffs = {
  leaders: Staff[];
  cores: Staff[];
  volunteers: Staff[];
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

function shuffleNonPinned(staffArray: Staff[]): Staff[] {
  const pinned = staffArray.filter(staff => staff.pinned);
  const nonPinned = staffArray.filter(staff => !staff.pinned);
  const shuffledNonPinned = shuffleArray(nonPinned);
  return [...pinned, ...shuffledNonPinned];
}

export default defineEventHandler(async (): Promise<Staffs> => {
  return {
    leaders: shuffleNonPinned(staffs.leaders),
    cores: shuffleNonPinned(staffs.cores),
    volunteers: staffs.volunteers, // volunteers are not shuffled
  };
});
