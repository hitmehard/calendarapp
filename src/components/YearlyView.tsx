"use client";

import { getMonthGrid, toDateString } from "@/lib/calendar-utils";
import { CalendarEvent } from "@/types/calendar";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

interface YearlyViewProps {
  year: number;
  getEventsForDate: (date: string) => CalendarEvent[];
  onMonthClick: (month: number) => void;
  onDateClick: (date: string) => void;
}

export default function YearlyView({
  year,
  getEventsForDate,
  onMonthClick,
  onDateClick,
}: YearlyViewProps) {
  const today = toDateString(new Date());

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {MONTH_NAMES.map((name, monthIndex) => {
        const cells = getMonthGrid(year, monthIndex);
        return (
          <div
            key={monthIndex}
            className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
          >
            <button
              onClick={() => onMonthClick(monthIndex)}
              className="mb-2 w-full text-left text-sm font-semibold text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
            >
              {name}
            </button>
            <div className="grid grid-cols-7 gap-px">
              {WEEKDAY_INITIALS.map((d, i) => (
                <div
                  key={i}
                  className="pb-1 text-center text-[10px] font-medium text-zinc-400"
                >
                  {d}
                </div>
              ))}
              {cells.map((cell, i) => {
                const dateStr = toDateString(cell.date);
                const hasEvents = getEventsForDate(dateStr).length > 0;
                const isToday = dateStr === today;

                return (
                  <button
                    key={i}
                    onClick={() => onDateClick(dateStr)}
                    className={`relative flex h-6 w-full items-center justify-center rounded text-[11px] transition-colors ${
                      !cell.isCurrentMonth
                        ? "text-zinc-300 dark:text-zinc-700"
                        : isToday
                          ? "bg-blue-600 font-bold text-white"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {cell.date.getDate()}
                    {hasEvents && !isToday && (
                      <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
