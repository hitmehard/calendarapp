import { DayCell as DayCellType, CalendarEvent } from "@/types/calendar";
import EventItem from "./EventItem";

interface DayCellProps {
  day: DayCellType;
  events: CalendarEvent[];
  onDateClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
  dateString: string;
}

export default function DayCell({
  day,
  events,
  onDateClick,
  onEventClick,
  dateString,
}: DayCellProps) {
  const maxVisible = 2;
  const overflow = events.length - maxVisible;

  return (
    <div
      onClick={() => onDateClick(dateString)}
      className={`min-h-[60px] cursor-pointer border border-zinc-200 p-1 hover:bg-zinc-50 sm:min-h-[100px] sm:p-2 dark:border-zinc-700 dark:hover:bg-zinc-800/50 ${
        !day.isCurrentMonth ? "bg-zinc-50 dark:bg-zinc-900/50" : ""
      }`}
    >
      <div className="mb-1 flex justify-end">
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs sm:text-sm ${
            day.isToday
              ? "bg-blue-600 font-bold text-white"
              : day.isCurrentMonth
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 dark:text-zinc-600"
          }`}
        >
          {day.date.getDate()}
        </span>
      </div>

      {/* Desktop: event pills */}
      <div className="hidden flex-col gap-0.5 sm:flex">
        {events.slice(0, maxVisible).map((event) => (
          <EventItem key={event.id} event={event} onClick={onEventClick} />
        ))}
        {overflow > 0 && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            +{overflow} more
          </span>
        )}
      </div>

      {/* Mobile: colored dots */}
      {events.length > 0 && (
        <div className="flex justify-center gap-0.5 sm:hidden">
          {events.slice(0, 3).map((e) => (
            <div
              key={e.id}
              className="h-1.5 w-1.5 rounded-full bg-blue-500"
            />
          ))}
        </div>
      )}
    </div>
  );
}
