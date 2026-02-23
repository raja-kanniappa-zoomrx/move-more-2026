import { useMemo } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeWeeklyTrends } from "@/data/metrics";

interface WeekOverWeekTrendProps {
  activities: Activity[];
}

export function WeekOverWeekTrend({ activities }: WeekOverWeekTrendProps) {
  const data = useMemo(() => computeWeeklyTrends(activities), [activities]);

  const chartConfig = {
    count: { label: "Activities", color: "var(--chart-1)" },
    distanceKm: { label: "Distance (km)", color: "var(--accent)" },
  };

  return (
    <ChartCard title="Week-over-Week Trend" description="Weekly activity and distance progression">
      <ChartContainer config={chartConfig} className="h-full min-h-[300px] w-full">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="weekLabel" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            yAxisId="left"
            dataKey="count"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="distanceKm"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ fill: "var(--accent)", r: 4 }}
            animationDuration={1500}
          />
        </ComposedChart>
      </ChartContainer>
    </ChartCard>
  );
}
