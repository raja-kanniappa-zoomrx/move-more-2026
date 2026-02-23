import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Activity } from "@/types";
import { computeDailyTimeline } from "@/data/metrics";

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const [view, setView] = useState<"count" | "distance">("count");
  const data = useMemo(() => computeDailyTimeline(activities), [activities]);

  const chartConfig = {
    count: { label: "Activities", color: "var(--chart-1)" },
    distanceKm: { label: "Distance (km)", color: "var(--metric-distance)" },
  };

  const dataKey = view === "count" ? "count" : "distanceKm";

  return (
    <ChartCard
      title="Activity Timeline"
      description="Daily activity over the challenge period"
      action={
        <Tabs value={view} onValueChange={(v) => setView(v as "count" | "distance")}>
          <TabsList>
            <TabsTrigger value="count">Count</TabsTrigger>
            <TabsTrigger value="distance">Distance</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={view === "count" ? "var(--chart-1)" : "var(--metric-distance)"} stopOpacity={0.3} />
              <stop offset="100%" stopColor={view === "count" ? "var(--chart-1)" : "var(--metric-distance)"} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={view === "count" ? "var(--chart-1)" : "var(--metric-distance)"}
            strokeWidth={2}
            fill="url(#areaGradient)"
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}
