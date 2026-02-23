"use client";

import { useState, useCallback } from "react";
import { CalendarEvent } from "@/types/calendar";
import { toDateString } from "@/lib/calendar-utils";
import { useEvents } from "@/hooks/useEvents";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import EventModal from "@/components/EventModal";

export default function Home() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const { addEvent, updateEvent, deleteEvent, getEventsForDate } = useEvents();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const goToPrev = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, []);

  const handleDateClick = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setModalOpen(true);
  }, []);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  }, []);

  const handleSave = useCallback(
    (data: Omit<CalendarEvent, "id"> | CalendarEvent) => {
      if ("id" in data) {
        updateEvent(data as CalendarEvent);
      } else {
        addEvent(data);
      }
      handleClose();
    },
    [addEvent, updateEvent, handleClose]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteEvent(id);
      handleClose();
    },
    [deleteEvent, handleClose]
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-5xl">
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          onPrev={goToPrev}
          onNext={goToNext}
          onToday={goToToday}
        />
        <CalendarGrid
          year={currentYear}
          month={currentMonth}
          getEventsForDate={getEventsForDate}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
        <EventModal
          isOpen={modalOpen}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
          initialDate={selectedDate || undefined}
          event={selectedEvent}
        />
      </div>
    </div>
  );
}
