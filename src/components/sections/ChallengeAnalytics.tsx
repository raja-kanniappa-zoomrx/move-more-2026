import { useMemo } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon } from "@/components/shared/ActivityIcon";
import type { Activity } from "@/types";
import { computeChallengeHighlights } from "@/data/metrics";

interface ChallengeAnalyticsProps {
  activities: Activity[];
}

export function ChallengeAnalytics({ activities }: ChallengeAnalyticsProps) {
  const highlights = useMemo(
    () => computeChallengeHighlights(activities),
    [activities]
  );

  const stats = [
    {
      icon: CalendarDays,
      label: "Most Active Day",
      value: highlights.mostActiveDay.date,
      detail: `${highlights.mostActiveDay.count} activities`,
      color: "var(--primary)",
    },
    {
      icon: Clock,
      label: "Peak Exercise Hour",
      value: highlights.busiestHour.label,
      detail: `${highlights.busiestHour.count} activities`,
      color: "var(--metric-duration)",
    },
    {
      icon: Trophy,
      label: "Longest Activity",
      value: highlights.longestActivity.name,
      detail: `${highlights.longestActivity.durationFormatted} (${highlights.longestActivity.type})`,
      color: "var(--metric-pace)",
    },
    {
      icon: MapPin,
      label: "Longest Distance",
      value: highlights.longestDistance.name,
      detail: `${highlights.longestDistance.distanceKm} km (${highlights.longestDistance.type})`,
      color: "var(--metric-distance)",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Challenge Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: stat.color + "15" }}
              >
                <stat.icon className="size-4" style={{ color: stat.color }} />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
                <div className="font-medium text-sm truncate">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
