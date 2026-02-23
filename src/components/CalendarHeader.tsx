"use client";

import { formatMonthYear } from "@/lib/calendar-utils";

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Previous month"
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
          aria-label="Next month"
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
          {formatMonthYear(year, month)}
        </h1>
      </div>
      <button
        onClick={onToday}
        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
      >
        Today
      </button>
    </div>
  );
}
