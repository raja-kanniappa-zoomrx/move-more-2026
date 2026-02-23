import { useMemo } from "react";
import {
  Activity as ActivityIcon,
  MapPin,
  Clock,
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { StatTile } from "@/components/shared/StatTile";
import type { Activity } from "@/types";
import { computeSummaryMetrics } from "@/data/metrics";

interface SummaryMetricsProps {
  activities: Activity[];
}

export function SummaryMetrics({ activities }: SummaryMetricsProps) {
  const metrics = useMemo(
    () => computeSummaryMetrics(activities),
    [activities]
  );

  const tiles = [
    {
      icon: ActivityIcon,
      label: "Total Activities",
      value: metrics.totalActivities,
      iconBg: "var(--stat-icon-bg-primary)",
      iconColor: "var(--primary)",
    },
    {
      icon: MapPin,
      label: "Total Distance",
      value: metrics.totalDistanceKm,
      suffix: "km",
      decimals: 1,
      iconBg: "var(--stat-icon-bg-distance)",
      iconColor: "var(--metric-distance)",
    },
    {
      icon: Clock,
      label: "Total Duration",
      value: metrics.totalDurationHours,
      suffix: "hrs",
      decimals: 1,
      iconBg: "var(--stat-icon-bg-duration)",
      iconColor: "var(--metric-duration)",
    },
    {
      icon: Users,
      label: "Participants",
      value: metrics.uniqueParticipants,
      iconBg: "var(--stat-icon-bg-warm)",
      iconColor: "var(--warning)",
    },
    {
      icon: CalendarDays,
      label: "Active Days",
      value: metrics.activeDays,
      iconBg: "var(--stat-icon-bg-primary)",
      iconColor: "var(--primary-dark)",
    },
    {
      icon: TrendingUp,
      label: "Avg Activities/Day",
      value: metrics.avgActivitiesPerDay,
      decimals: 1,
      iconBg: "var(--stat-icon-bg-distance)",
      iconColor: "var(--metric-pace)",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {tiles.map((tile, i) => (
        <StatTile key={tile.label} {...tile} delay={i * 0.1} />
      ))}
    </div>
  );
}
