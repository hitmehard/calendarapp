import { DayCell } from "@/types/calendar";

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getMonthGrid(year: number, month: number): DayCell[] {
  const today = new Date();
  const todayStr = toDateString(today);

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay(); // 0=Sunday

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, 1 - startOffset + i);
    cells.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: toDateString(date) === todayStr,
    });
  }
  return cells;
}

export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}
