import type { Speaker } from "../speaker";
import { SESSION_SPEAKERS } from "./speakers";

export function getSpeaker(id: string): Speaker {
  const speaker = SESSION_SPEAKERS.find(s => s.id === id);
  if (!speaker) {
    throw new Error(`Speaker not found: ${id}`);
  }
  return speaker;
}

export function getSpeakers(...ids: string[]): Speaker[] {
  return ids.map(id => getSpeaker(id));
}

// TIMETABLE data has been moved to server/api/timetable/index.get.ts
// to avoid duplication between ja and en locales
