"use client";

import { useEffect, useState, useRef } from "react";

interface HistoricalFactProps {
  type: "day" | "month" | "year";
  date: string; // "YYYY-MM-DD"
}

const cache = new Map<string, string>();

export default function HistoricalFact({ type, date }: HistoricalFactProps) {
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const key = `${type}:${date}`;

    if (cache.has(key)) {
      setFact(cache.get(key)!);
      setLoading(false);
      setError(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(false);
    setFact(null);

    fetch(`/api/historical-fact?type=${type}&date=${date}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.fact) {
          cache.set(key, data.fact);
          setFact(data.fact);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [type, date]);

  if (error) return null;

  const label =
    type === "day"
      ? "On this day"
      : type === "month"
        ? "This month in history"
        : "This year in history";

  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950">
      <p className="mb-1 text-xs font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-400">
        {label}
      </p>
      {loading ? (
        <div className="h-4 w-3/4 animate-pulse rounded bg-amber-200 dark:bg-amber-800" />
      ) : (
        <p className="text-sm text-amber-900 dark:text-amber-200">{fact}</p>
      )}
    </div>
  );
}
