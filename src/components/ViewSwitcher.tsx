"use client";

export type CalendarView = "day" | "month" | "year";

interface ViewSwitcherProps {
  current: CalendarView;
  onChange: (view: CalendarView) => void;
}

const VIEWS: { value: CalendarView; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

export default function ViewSwitcher({ current, onChange }: ViewSwitcherProps) {
  return (
    <div className="inline-flex rounded-lg border border-zinc-300 dark:border-zinc-600">
      {VIEWS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
            current === value
              ? "bg-blue-600 text-white"
              : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
