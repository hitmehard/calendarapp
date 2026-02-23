"use client";

import { formatMonthYear, toDateString } from "@/lib/calendar-utils";
import ViewSwitcher, { CalendarView } from "./ViewSwitcher";

interface CalendarHeaderProps {
  year: number;
  month: number;
  day: number;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

function getTitle(view: CalendarView, year: number, month: number, day: number) {
  if (view === "year") return String(year);
  if (view === "day") {
    const date = new Date(year, month, day);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return formatMonthYear(year, month);
}

export default function CalendarHeader({
  year,
  month,
  day,
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Previous"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Next"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold sm:text-2xl">
          {getTitle(view, year, month, day)}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          Today
        </button>
        <ViewSwitcher current={view} onChange={onViewChange} />
      </div>
    </div>
  );
}
