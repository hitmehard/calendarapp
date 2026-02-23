"use client";

import { CalendarEvent } from "@/types/calendar";
import { formatTime, toDateString } from "@/lib/calendar-utils";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface DailyViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick: (date: string, time: string) => void;
}

function getEventPosition(event: CalendarEvent) {
  const [startH, startM] = event.startTime.split(":").map(Number);
  const [endH, endM] = event.endTime.split(":").map(Number);
  const top = (startH + startM / 60) * 64; // 64px per hour
  const height = Math.max((endH + endM / 60 - startH - startM / 60) * 64, 24);
  return { top, height };
}

export default function DailyView({
  date,
  events,
  onEventClick,
  onTimeSlotClick,
}: DailyViewProps) {
  const dateStr = toDateString(date);
  const dayLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {dayLabel}
        </h2>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="relative">
          {HOURS.map((hour) => (
            <div
              key={hour}
              onClick={() =>
                onTimeSlotClick(dateStr, `${String(hour).padStart(2, "0")}:00`)
              }
              className="flex h-16 cursor-pointer border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
            >
              <div className="w-16 shrink-0 pr-2 pt-1 text-right text-xs text-zinc-400 sm:w-20">
                {formatTime(`${String(hour).padStart(2, "0")}:00`)}
              </div>
              <div className="relative flex-1 border-l border-zinc-200 dark:border-zinc-700" />
            </div>
          ))}

          {/* Event overlays */}
          <div className="absolute top-0 right-0 left-16 sm:left-20">
            {events.map((event) => {
              const { top, height } = getEventPosition(event);
              return (
                <button
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className="absolute right-2 left-1 overflow-hidden rounded bg-blue-100 px-2 py-1 text-left hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <div className="truncate text-xs font-medium text-blue-800 dark:text-blue-200">
                    {event.title}
                  </div>
                  <div className="truncate text-xs text-blue-600 dark:text-blue-300">
                    {formatTime(event.startTime)} – {formatTime(event.endTime)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
