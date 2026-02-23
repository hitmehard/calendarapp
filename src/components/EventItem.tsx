import { CalendarEvent } from "@/types/calendar";
import { formatTime } from "@/lib/calendar-utils";

interface EventItemProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

export default function EventItem({ event, onClick }: EventItemProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className="w-full truncate rounded bg-blue-100 px-1.5 py-0.5 text-left text-xs text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
    >
      <span className="font-medium">{formatTime(event.startTime)}</span>{" "}
      {event.title}
    </button>
  );
}
