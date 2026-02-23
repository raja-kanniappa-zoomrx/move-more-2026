import Papa from "papaparse";
import { format, differenceInCalendarWeeks } from "date-fns";
import type { Activity, ActivityType } from "@/types";

interface RawRow {
  Athlete: string;
  Activity: string;
  Type: string;
  Location: string;
  Name: string;
  Date: string;
  Hrs: string;       // new column in 2026 CSV (time-of-day, not used)
  Distance: string;
  Pace: string;
  Unit: string;
  Duration: string;
  Elev: string;
  Calo: string;
  EstPace: string;
  EstSpeed: string;
}

function parseDuration(duration: string): number {
  if (!duration) return 0;
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 60 + parts[1] + parts[2] / 60;
  }
  if (parts.length === 2) {
    return parts[0] + parts[1] / 60;
  }
  return 0;
}

function parseDistance(distance: string): number | null {
  if (!distance || distance.trim() === "") return null;
  const cleaned = distance.replace(/,/g, "");
  const val = parseFloat(cleaned);
  return isNaN(val) ? null : val;
}

// Handles both DD-MM-YYYY (new 2026 CSV) and ISO 8601 (old 2024 CSV)
function parseDate(raw: string): Date {
  const m = raw.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}`);
  return new Date(raw);
}

function parsePaceToMinPerKm(pace: string): number | null {
  if (!pace || pace.includes("/100m")) return null;
  const parts = pace.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] + parts[1] / 60;
  }
  return null;
}

export async function loadAndParseCSV(): Promise<Activity[]> {
  const response = await fetch(`/zoomrx.csv?v=${Date.now()}`, { cache: "no-store" });
  const text = await response.text();

  const result = Papa.parse<RawRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.replace(/[" ]/g, "").trim(),
  });

  const validRows = result.data.filter(
    (row) =>
      row.Name &&
      row.Date &&
      row.Distance?.trim() !== "" &&
      row.Unit?.trim() !== "" &&
      row.Duration?.trim() !== ""
  );

  // First pass: parse dates to find the min (challenge start)
  const parsed = validRows.map((row) => {
    const date = parseDate(row.Date);
    const distanceRaw = parseDistance(row.Distance);
    const unit = (row.Unit?.trim() as "km" | "m" | null) || null;
    const distanceKm =
      distanceRaw !== null
        ? unit === "m"
          ? distanceRaw / 1000
          : distanceRaw
        : null;

    return {
      athleteId: row.Athlete || "",
      activityId: row.Activity || "",
      type: (row.Type || "Workout") as ActivityType,
      location: row.Location || "",
      athleteName: row.Name,
      date,
      distanceKm,
      distanceRaw,
      distanceUnit: unit,
      pace: row.Pace || null,
      durationMinutes: parseDuration(row.Duration),
      durationFormatted: row.Duration || "0:00:00",
      elevation: row.Elev ? parseFloat(row.Elev) : null,
      calories: row.Calo ? parseInt(row.Calo, 10) : null,
      estPace: row.EstPace || null,
      estSpeedKmh: row.EstSpeed ? parseFloat(row.EstSpeed) : null,
      hour: date.getHours(),
      dayOfWeek: date.getDay(),
      weekNumber: 0, // placeholder, set in second pass
      dateKey: format(date, "yyyy-MM-dd"),
    };
  });

  if (parsed.length === 0) return [];

  // Second pass: compute weekNumber relative to the earliest date in the dataset
  const minTime = Math.min(...parsed.map((a) => a.date.getTime()));
  const minDate = new Date(minTime);

  return parsed.map((a) => ({
    ...a,
    weekNumber: differenceInCalendarWeeks(a.date, minDate, { weekStartsOn: 1 }),
  }));
}

export { parsePaceToMinPerKm };
