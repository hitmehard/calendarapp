import { CalendarEvent } from "@/types/calendar";

const STORAGE_KEY = "calendar-events";

export function loadEvents(): CalendarEvent[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveEvents(events: CalendarEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // localStorage full or unavailable
  }
}
