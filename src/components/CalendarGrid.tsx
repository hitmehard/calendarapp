"use client";

import { getMonthGrid, toDateString } from "@/lib/calendar-utils";
import { CalendarEvent } from "@/types/calendar";
import DayCell from "./DayCell";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  year: number;
  month: number;
  getEventsForDate: (date: string) => CalendarEvent[];
  onDateClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function CalendarGrid({
  year,
  month,
  getEventsForDate,
  onDateClick,
  onEventClick,
}: CalendarGridProps) {
  const cells = getMonthGrid(year, month);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="grid grid-cols-7 bg-zinc-100 dark:bg-zinc-800">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-b border-zinc-200 py-2 text-center text-xs font-medium text-zinc-600 sm:text-sm dark:border-zinc-700 dark:text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const dateStr = toDateString(cell.date);
          return (
            <DayCell
              key={i}
              day={cell}
              dateString={dateStr}
              events={getEventsForDate(dateStr)}
              onDateClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
}
