// types/timetable.ts
import type { Speaker } from "./speaker";

export interface TimetableCell {
  id: string;
  type?: "session" | "lightningTalk" | "schedule" | "event";
  title?: string;
  startTime?: string;
  endTime?: string;
  speakers?: Speaker[];
  slide?: string;
  colspan?: number;
  rowspan?: number;
  track?: "hacomono" | "mates" | "feature" | "cyberAgent" | "blank";
  isPcOnly?: boolean;
  link?: string;
}

export interface TableRow {
  id: string;
  time?: string;
  cells: TimetableCell[];
}

export interface Timetable {
  id: string;
  rows: TableRow[];
}
