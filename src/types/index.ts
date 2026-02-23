export type ActivityType = "Run" | "Walk" | "Hike";

export interface Activity {
  athleteId: string;
  activityId: string;
  type: ActivityType;
  location: string;
  athleteName: string;
  date: Date;
  distanceKm: number | null;
  distanceRaw: number | null;
  distanceUnit: "km" | "m" | null;
  pace: string | null;
  durationMinutes: number;
  durationFormatted: string;
  elevation: number | null;
  calories: number | null;
  estPace: string | null;
  estSpeedKmh: number | null;
  hour: number;
  dayOfWeek: number;
  weekNumber: number;
  dateKey: string;
}

export interface Filters {
  dateRange: [Date | null, Date | null];
  activityTypes: ActivityType[];
  participants: string[];
}

export interface ParticipantSummary {
  name: string;
  totalActivities: number;
  uniqueDays: number;
  totalDistanceKm: number;
  totalDurationMinutes: number;
  avgDistancePerActivity: number;
  avgDurationPerActivity: number;
  activityTypes: ActivityType[];
  longestStreak: number;
  favoriteActivity: ActivityType;
  compositeScore: number;
}

export interface DailyData {
  date: string;
  dateLabel: string;
  count: number;
  distanceKm: number;
}

export interface ParticipantMetric {
  name: string;
  value: number;
}

export interface HistogramBin {
  bin: string;
  count: number;
}

export interface WeekdayData {
  day: string;
  count: number;
  distanceKm: number;
}

export interface HourData {
  hour: number;
  label: string;
  count: number;
}

export interface ActivityTypeData {
  type: ActivityType;
  count: number;
  percentage: number;
  distanceKm: number;
  durationMinutes: number;
}

export interface HeatmapCell {
  participant: string;
  date: string;
  count: number;
}

export interface StreakData {
  name: string;
  longestStreak: number;
  totalDays: number;
}

export interface WeeklyTrend {
  week: number;
  weekLabel: string;
  count: number;
  distanceKm: number;
  durationHrs: number;
}

export interface PacePoint {
  name: string;
  distanceKm: number;
  paceMinPerKm: number;
  type: ActivityType;
  durationMinutes: number;
}

export interface ChallengeHighlights {
  mostActiveDay: { date: string; count: number };
  mostPopularActivity: { type: ActivityType; count: number };
  busiestHour: { hour: number; label: string; count: number };
  longestActivity: { name: string; durationFormatted: string; type: ActivityType };
  longestDistance: { name: string; distanceKm: number; type: ActivityType };
  mostDiverseParticipant: { name: string; typeCount: number };
  totalCalories: number;
}
