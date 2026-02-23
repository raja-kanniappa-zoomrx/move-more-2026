import type { ActivityType } from "@/types";

export const ACTIVITY_COLORS: Record<ActivityType, string> = {
  Run: "var(--chart-1)",
  Walk: "var(--chart-3)",
  Hike: "var(--chart-4)",
};

export const ACTIVITY_ICON_NAMES: Record<ActivityType, string> = {
  Run: "Footprints",
  Walk: "Footprints",
  Hike: "Mountain",
};

export const CHALLENGE_START = new Date("2024-08-22");
export const CHALLENGE_END = new Date("2024-09-30");

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const PARTICIPANT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--metric-distance)",
  "var(--metric-duration)",
  "var(--metric-pace)",
  "var(--accent)",
  "var(--primary-dark)",
  "var(--warning)",
  "var(--destructive)",
  "var(--primary-darkest)",
  "var(--accent-dark)",
];

export const ALL_ACTIVITY_TYPES: ActivityType[] = ["Run", "Walk", "Hike"];

export const INCLUDED_RAW_TYPES = new Set(["Run", "Walk", "Hike"]);
