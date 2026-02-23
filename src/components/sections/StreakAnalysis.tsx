import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeStreaks } from "@/data/metrics";

interface StreakAnalysisProps {
  activities: Activity[];
  displayNames: Map<string, string>;
}

export function StreakAnalysis({ activities, displayNames }: StreakAnalysisProps) {
  const data = useMemo(() => computeStreaks(activities), [activities]);

  const chartConfig = {
    longestStreak: { label: "Longest Streak (days)", color: "var(--chart-1)" },
  };

  return (
    <ChartCard title="Consistency Streaks" description="Longest consecutive active day streaks">
      <ChartContainer config={chartConfig} className="h-full min-h-[300px] w-full">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis
            dataKey="name"
            type="category"
            width={90}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: string) => displayNames.get(v) ?? v}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="longestStreak" radius={[0, 4, 4, 0]} animationDuration={1200}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--chart-1)" />
            ))}
            <LabelList
              dataKey="longestStreak"
              position="right"
              className="fill-foreground text-xs"
              formatter={(v: number) => `${v}d`}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
