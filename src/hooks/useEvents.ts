"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalendarEvent } from "@/types/calendar";
import { loadEvents, saveEvents } from "@/lib/storage";

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    setEvents(loadEvents());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) {
      saveEvents(events);
    }
  }, [events]);

  const addEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = { ...event, id: crypto.randomUUID() };
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback((event: CalendarEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getEventsForDate = useCallback(
    (dateString: string) => {
      return events
        .filter((e) => e.date === dateString)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    },
    [events]
  );

  return { events, addEvent, updateEvent, deleteEvent, getEventsForDate };
}
