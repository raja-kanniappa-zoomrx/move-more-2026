import { format, eachDayOfInterval } from "date-fns";
import type {
  Activity,
  ActivityType,
  DailyData,
  ParticipantMetric,
  HistogramBin,
  WeekdayData,
  HourData,
  ActivityTypeData,
  HeatmapCell,
  StreakData,
  WeeklyTrend,
  ParticipantSummary,
  ChallengeHighlights,
} from "@/types";
import { DAY_LABELS } from "./constants";

// Derive the actual date range covered by the activities array
function activityDateRange(activities: Activity[]): { start: Date; end: Date } {
  const times = activities.map((a) => a.date.getTime());
  return {
    start: new Date(Math.min(...times)),
    end: new Date(Math.max(...times)),
  };
}

export function computeSummaryMetrics(activities: Activity[]) {
  const totalActivities = activities.length;
  const totalDistanceKm = activities.reduce(
    (sum, a) => sum + (a.distanceKm || 0),
    0
  );
  const totalDurationMinutes = activities.reduce(
    (sum, a) => sum + a.durationMinutes,
    0
  );
  const uniqueParticipants = new Set(activities.map((a) => a.athleteName)).size;
  const activeDays = new Set(activities.map((a) => a.dateKey)).size;
  const avgActivitiesPerDay =
    activeDays > 0 ? totalActivities / activeDays : 0;

  return {
    totalActivities,
    totalDistanceKm,
    totalDurationHours: totalDurationMinutes / 60,
    uniqueParticipants,
    activeDays,
    avgActivitiesPerDay,
  };
}

export function computeDailyTimeline(activities: Activity[]): DailyData[] {
  if (activities.length === 0) return [];
  const { start, end } = activityDateRange(activities);
  const days = eachDayOfInterval({ start, end });

  const byDate = new Map<string, { count: number; distanceKm: number }>();
  for (const a of activities) {
    const existing = byDate.get(a.dateKey) || { count: 0, distanceKm: 0 };
    existing.count++;
    existing.distanceKm += a.distanceKm || 0;
    byDate.set(a.dateKey, existing);
  }

  return days.map((day) => {
    const key = format(day, "yyyy-MM-dd");
    const data = byDate.get(key) || { count: 0, distanceKm: 0 };
    return {
      date: key,
      dateLabel: format(day, "MMM d"),
      count: data.count,
      distanceKm: Math.round(data.distanceKm * 10) / 10,
    };
  });
}

export function computeParticipantUniqueDays(
  activities: Activity[]
): ParticipantMetric[] {
  const map = new Map<string, Set<string>>();
  for (const a of activities) {
    if (!map.has(a.athleteName)) map.set(a.athleteName, new Set());
    map.get(a.athleteName)!.add(a.dateKey);
  }
  return Array.from(map.entries())
    .map(([name, days]) => ({ name, value: days.size }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 20);
}

export function computeParticipantTotalDistance(
  activities: Activity[]
): ParticipantMetric[] {
  const map = new Map<string, number>();
  for (const a of activities) {
    map.set(a.athleteName, (map.get(a.athleteName) || 0) + (a.distanceKm || 0));
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value: Math.round(value * 10) / 10 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 20);
}

export function computeParticipantAvgDistance(
  activities: Activity[]
): ParticipantMetric[] {
  const distMap = new Map<string, number>();
  const countMap = new Map<string, number>();
  for (const a of activities) {
    if (a.distanceKm !== null) {
      distMap.set(
        a.athleteName,
        (distMap.get(a.athleteName) || 0) + a.distanceKm
      );
      countMap.set(a.athleteName, (countMap.get(a.athleteName) || 0) + 1);
    }
  }
  return Array.from(distMap.entries())
    .map(([name, dist]) => ({
      name,
      value: Math.round((dist / (countMap.get(name) || 1)) * 10) / 10,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 20);
}

export function computeDurationHistogram(
  activities: Activity[]
): HistogramBin[] {
  const bins = [
    { label: "0-15m", min: 0, max: 15 },
    { label: "15-30m", min: 15, max: 30 },
    { label: "30-60m", min: 30, max: 60 },
    { label: "60-90m", min: 60, max: 90 },
    { label: "90-120m", min: 90, max: 120 },
    { label: "120m+", min: 120, max: Infinity },
  ];

  return bins.map((bin) => ({
    bin: bin.label,
    count: activities.filter(
      (a) => a.durationMinutes >= bin.min && a.durationMinutes < bin.max
    ).length,
  }));
}

export function computeDistanceHistogram(
  activities: Activity[]
): HistogramBin[] {
  const withDist = activities.filter((a) => a.distanceKm !== null);
  const bins = [
    { label: "0-2km", min: 0, max: 2 },
    { label: "2-5km", min: 2, max: 5 },
    { label: "5-10km", min: 5, max: 10 },
    { label: "10-15km", min: 10, max: 15 },
    { label: "15-21km", min: 15, max: 21 },
    { label: "21km+", min: 21, max: Infinity },
  ];

  return bins.map((bin) => ({
    bin: bin.label,
    count: withDist.filter(
      (a) => a.distanceKm! >= bin.min && a.distanceKm! < bin.max
    ).length,
  }));
}

export function computeWeekdayBreakdown(
  activities: Activity[]
): WeekdayData[] {
  const data: WeekdayData[] = DAY_LABELS.map((day) => ({
    day,
    count: 0,
    distanceKm: 0,
  }));

  for (const a of activities) {
    data[a.dayOfWeek].count++;
    data[a.dayOfWeek].distanceKm += a.distanceKm || 0;
  }

  // Reorder to start from Monday
  const reordered = [...data.slice(1), data[0]];
  return reordered.map((d) => ({
    ...d,
    distanceKm: Math.round(d.distanceKm * 10) / 10,
  }));
}

export function computeHourOfDayBreakdown(
  activities: Activity[]
): HourData[] {
  const counts = new Array(24).fill(0);
  for (const a of activities) {
    counts[a.hour]++;
  }

  return counts.map((count, hour) => ({
    hour,
    label: `${hour % 12 || 12}${hour < 12 ? "am" : "pm"}`,
    count,
  }));
}

export function computeActivityTypeBreakdown(
  activities: Activity[]
): ActivityTypeData[] {
  const map = new Map<
    ActivityType,
    { count: number; distanceKm: number; durationMinutes: number }
  >();

  for (const a of activities) {
    const existing = map.get(a.type) || {
      count: 0,
      distanceKm: 0,
      durationMinutes: 0,
    };
    existing.count++;
    existing.distanceKm += a.distanceKm || 0;
    existing.durationMinutes += a.durationMinutes;
    map.set(a.type, existing);
  }

  const total = activities.length;
  return Array.from(map.entries())
    .map(([type, data]) => ({
      type,
      count: data.count,
      percentage: Math.round((data.count / total) * 1000) / 10,
      distanceKm: Math.round(data.distanceKm * 10) / 10,
      durationMinutes: Math.round(data.durationMinutes),
    }))
    .sort((a, b) => b.count - a.count);
}

// Returns a Set of the top-20 participant names by total activity count
function getTop20Participants(activities: Activity[]): Set<string> {
  const counts = new Map<string, number>();
  for (const a of activities) {
    counts.set(a.athleteName, (counts.get(a.athleteName) || 0) + 1);
  }
  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name]) => name);
  return new Set(sorted);
}

export function computeParticipantDateHeatmap(
  activities: Activity[]
): HeatmapCell[] {
  const top20 = getTop20Participants(activities);
  const filtered = activities.filter((a) => top20.has(a.athleteName));

  const cells: HeatmapCell[] = [];
  const map = new Map<string, number>();

  for (const a of filtered) {
    const key = `${a.athleteName}|${a.dateKey}`;
    map.set(key, (map.get(key) || 0) + 1);
  }

  for (const [key, count] of map) {
    const [participant, date] = key.split("|");
    cells.push({ participant, date, count });
  }

  return cells;
}

export function computeStreaks(activities: Activity[]): StreakData[] {
  const participantDates = new Map<string, Set<string>>();
  for (const a of activities) {
    if (!participantDates.has(a.athleteName))
      participantDates.set(a.athleteName, new Set());
    participantDates.get(a.athleteName)!.add(a.dateKey);
  }

  const { start, end } = activityDateRange(activities);
  const allDays = eachDayOfInterval({ start, end }).map((d) =>
    format(d, "yyyy-MM-dd")
  );

  return Array.from(participantDates.entries())
    .map(([name, dateSet]) => {
      let longestStreak = 0;
      let currentStreak = 0;

      for (const day of allDays) {
        if (dateSet.has(day)) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }

      return {
        name,
        longestStreak,
        totalDays: dateSet.size,
      };
    })
    .sort((a, b) => b.longestStreak - a.longestStreak)
    .slice(0, 20);
}

export function computeWeeklyTrends(activities: Activity[]): WeeklyTrend[] {
  const weekMap = new Map<
    number,
    { count: number; distanceKm: number; durationMinutes: number }
  >();

  for (const a of activities) {
    const w = a.weekNumber;
    const existing = weekMap.get(w) || {
      count: 0,
      distanceKm: 0,
      durationMinutes: 0,
    };
    existing.count++;
    existing.distanceKm += a.distanceKm || 0;
    existing.durationMinutes += a.durationMinutes;
    weekMap.set(w, existing);
  }

  return Array.from(weekMap.entries())
    .map(([week, data]) => ({
      week,
      weekLabel: `Week ${week + 1}`,
      count: data.count,
      distanceKm: Math.round(data.distanceKm * 10) / 10,
      durationHrs: Math.round((data.durationMinutes / 60) * 10) / 10,
    }))
    .sort((a, b) => a.week - b.week);
}

export function computeActivityDistances(
  activities: Activity[]
): { name: string; distanceKm: number; type: ActivityType; durationMinutes: number; dateKey: string; dateTs: number }[] {
  return activities
    .filter((a) => a.distanceKm !== null && a.distanceKm > 0)
    .map((a) => ({
      name: a.athleteName,
      distanceKm: a.distanceKm!,
      type: a.type,
      durationMinutes: a.durationMinutes,
      dateKey: a.dateKey,
      dateTs: a.date.getTime(),
    }));
}

export function computeCumulativeDistance(
  activities: Activity[]
): Record<string, number | string>[] {
  const top20 = getTop20Participants(activities);
  const participants = [...new Set(activities.map((a) => a.athleteName))].filter(
    (p) => top20.has(p)
  );
  if (activities.length === 0) return [];
  const { start, end } = activityDateRange(activities);
  const days = eachDayOfInterval({ start, end });

  const cumulative = new Map<string, number>();
  participants.forEach((p) => cumulative.set(p, 0));

  const dailyDist = new Map<string, Map<string, number>>();
  for (const a of activities) {
    if (a.distanceKm === null) continue;
    if (!dailyDist.has(a.dateKey)) dailyDist.set(a.dateKey, new Map());
    const dayMap = dailyDist.get(a.dateKey)!;
    dayMap.set(a.athleteName, (dayMap.get(a.athleteName) || 0) + a.distanceKm);
  }

  return days.map((day) => {
    const key = format(day, "yyyy-MM-dd");
    const dayLabel = format(day, "MMM d");
    const dayMap = dailyDist.get(key);

    const row: Record<string, number | string> = { date: dayLabel };

    for (const p of participants) {
      const added = dayMap?.get(p) || 0;
      cumulative.set(p, (cumulative.get(p) || 0) + added);
      row[p] = Math.round((cumulative.get(p) || 0) * 10) / 10;
    }

    return row;
  });
}

export function computeLeaderboard(
  activities: Activity[]
): ParticipantSummary[] {
  return computeParticipantTable(activities)
    .sort((a, b) => b.compositeScore - a.compositeScore)
    .slice(0, 20);
}

export function computeParticipantTable(
  activities: Activity[]
): ParticipantSummary[] {
  const participants = [...new Set(activities.map((a) => a.athleteName))];
  const streaks = computeStreaks(activities);
  const streakMap = new Map(streaks.map((s) => [s.name, s.longestStreak]));

  return participants.map((name) => {
    const mine = activities.filter((a) => a.athleteName === name);
    const uniqueDays = new Set(mine.map((a) => a.dateKey)).size;
    const totalDistanceKm = mine.reduce(
      (s, a) => s + (a.distanceKm || 0),
      0
    );
    const totalDurationMinutes = mine.reduce(
      (s, a) => s + a.durationMinutes,
      0
    );
    const distActivities = mine.filter((a) => a.distanceKm !== null);
    const avgDistancePerActivity =
      distActivities.length > 0
        ? totalDistanceKm / distActivities.length
        : 0;

    const typeCounts = new Map<ActivityType, number>();
    for (const a of mine) {
      typeCounts.set(a.type, (typeCounts.get(a.type) || 0) + 1);
    }
    const favoriteActivity = [...typeCounts.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "Run";

    const longestStreak = streakMap.get(name) || 0;

    return {
      name,
      totalActivities: mine.length,
      uniqueDays,
      totalDistanceKm: Math.round(totalDistanceKm * 10) / 10,
      totalDurationMinutes: Math.round(totalDurationMinutes),
      avgDistancePerActivity:
        Math.round(avgDistancePerActivity * 10) / 10,
      avgDurationPerActivity:
        mine.length > 0
          ? Math.round((totalDurationMinutes / mine.length) * 10) / 10
          : 0,
      activityTypes: [...typeCounts.keys()],
      longestStreak,
      favoriteActivity: favoriteActivity as ActivityType,
      compositeScore:
        uniqueDays * 3 + mine.length * 1 + totalDistanceKm * 0.5,
    };
  })
  .sort((a, b) => b.compositeScore - a.compositeScore)
  .slice(0, 20);
}

export function computeChallengeHighlights(
  activities: Activity[]
): ChallengeHighlights {
  // Most active day
  const dayCounts = new Map<string, number>();
  for (const a of activities) {
    dayCounts.set(a.dateKey, (dayCounts.get(a.dateKey) || 0) + 1);
  }
  const mostActiveDay = [...dayCounts.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0] || ["", 0];

  // Most popular activity
  const typeCounts = new Map<ActivityType, number>();
  for (const a of activities) {
    typeCounts.set(a.type, (typeCounts.get(a.type) || 0) + 1);
  }
  const mostPopular = [...typeCounts.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0] || ["Run", 0];

  // Busiest hour
  const hourCounts = new Array(24).fill(0);
  for (const a of activities) hourCounts[a.hour]++;
  const busiestHourIdx = hourCounts.indexOf(Math.max(...hourCounts));

  // Longest activity by duration
  const longestByDuration = activities.reduce((best, a) =>
    a.durationMinutes > best.durationMinutes ? a : best
  );

  // Longest by distance
  const withDist = activities.filter((a) => a.distanceKm !== null);
  const longestByDistance =
    withDist.length > 0
      ? withDist.reduce((best, a) =>
          (a.distanceKm || 0) > (best.distanceKm || 0) ? a : best
        )
      : activities[0];

  // Most diverse participant
  const participantTypes = new Map<string, Set<ActivityType>>();
  for (const a of activities) {
    if (!participantTypes.has(a.athleteName))
      participantTypes.set(a.athleteName, new Set());
    participantTypes.get(a.athleteName)!.add(a.type);
  }
  const mostDiverse = [...participantTypes.entries()].sort(
    (a, b) => b[1].size - a[1].size
  )[0];

  // Total calories
  const totalCalories = activities.reduce(
    (sum, a) => sum + (a.calories || 0),
    0
  );

  return {
    mostActiveDay: {
      date: format(new Date(mostActiveDay[0]), "MMM d, yyyy"),
      count: mostActiveDay[1] as number,
    },
    mostPopularActivity: {
      type: mostPopular[0] as ActivityType,
      count: mostPopular[1] as number,
    },
    busiestHour: {
      hour: busiestHourIdx,
      label: `${busiestHourIdx % 12 || 12}${busiestHourIdx < 12 ? "am" : "pm"}`,
      count: hourCounts[busiestHourIdx],
    },
    longestActivity: {
      name: longestByDuration.athleteName,
      durationFormatted: longestByDuration.durationFormatted,
      type: longestByDuration.type,
    },
    longestDistance: {
      name: longestByDistance.athleteName,
      distanceKm:
        Math.round((longestByDistance.distanceKm || 0) * 100) / 100,
      type: longestByDistance.type,
    },
    mostDiverseParticipant: {
      name: mostDiverse?.[0] || "",
      typeCount: mostDiverse?.[1]?.size || 0,
    },
    totalCalories,
  };
}
