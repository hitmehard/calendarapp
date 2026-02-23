"use client";

import { useState, useCallback } from "react";
import { CalendarEvent } from "@/types/calendar";
import { toDateString } from "@/lib/calendar-utils";
import { useEvents } from "@/hooks/useEvents";
import { CalendarView } from "@/components/ViewSwitcher";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import DailyView from "@/components/DailyView";
import YearlyView from "@/components/YearlyView";
import EventModal from "@/components/EventModal";

export default function Home() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const [view, setView] = useState<CalendarView>("month");
  const { addEvent, updateEvent, deleteEvent, getEventsForDate } = useEvents();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const goToPrev = useCallback(() => {
    if (view === "day") {
      const prev = new Date(currentYear, currentMonth, currentDay - 1);
      setCurrentYear(prev.getFullYear());
      setCurrentMonth(prev.getMonth());
      setCurrentDay(prev.getDate());
    } else if (view === "month") {
      setCurrentMonth((m) => {
        if (m === 0) {
          setCurrentYear((y) => y - 1);
          return 11;
        }
        return m - 1;
      });
    } else {
      setCurrentYear((y) => y - 1);
    }
  }, [view, currentYear, currentMonth, currentDay]);

  const goToNext = useCallback(() => {
    if (view === "day") {
      const next = new Date(currentYear, currentMonth, currentDay + 1);
      setCurrentYear(next.getFullYear());
      setCurrentMonth(next.getMonth());
      setCurrentDay(next.getDate());
    } else if (view === "month") {
      setCurrentMonth((m) => {
        if (m === 11) {
          setCurrentYear((y) => y + 1);
          return 0;
        }
        return m + 1;
      });
    } else {
      setCurrentYear((y) => y + 1);
    }
  }, [view, currentYear, currentMonth, currentDay]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setCurrentDay(today.getDate());
  }, []);

  const handleDateClick = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedEvent(null);
    setModalOpen(true);
  }, []);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setSelectedTime(null);
    setModalOpen(true);
  }, []);

  const handleTimeSlotClick = useCallback((date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedEvent(null);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
    setSelectedTime(null);
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

  const handleMonthClick = useCallback((month: number) => {
    setCurrentMonth(month);
    setView("month");
  }, []);

  const handleYearDateClick = useCallback((date: string) => {
    const [y, m, d] = date.split("-").map(Number);
    setCurrentYear(y);
    setCurrentMonth(m - 1);
    setCurrentDay(d);
    setView("day");
  }, []);

  const currentDate = new Date(currentYear, currentMonth, currentDay);
  const dailyDateStr = toDateString(currentDate);
  const dailyEvents = getEventsForDate(dailyDateStr);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-5xl">
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          day={currentDay}
          view={view}
          onViewChange={setView}
          onPrev={goToPrev}
          onNext={goToNext}
          onToday={goToToday}
        />

        {view === "month" && (
          <CalendarGrid
            year={currentYear}
            month={currentMonth}
            getEventsForDate={getEventsForDate}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}

        {view === "day" && (
          <DailyView
            date={currentDate}
            events={dailyEvents}
            onEventClick={handleEventClick}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )}

        {view === "year" && (
          <YearlyView
            year={currentYear}
            getEventsForDate={getEventsForDate}
            onMonthClick={handleMonthClick}
            onDateClick={handleYearDateClick}
          />
        )}

        <EventModal
          isOpen={modalOpen}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
          initialDate={selectedDate || undefined}
          initialTime={selectedTime || undefined}
          event={selectedEvent}
        />
      </div>
    </div>
  );
}
