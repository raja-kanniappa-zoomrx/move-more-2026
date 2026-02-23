import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeHourOfDayBreakdown } from "@/data/metrics";

interface HourOfDayChartProps {
  activities: Activity[];
}

function getHourColor(hour: number): string {
  if (hour >= 5 && hour < 12) return "var(--chart-1)";   // morning green
  if (hour >= 12 && hour < 17) return "var(--chart-3)";  // afternoon gold
  return "var(--chart-2)";                                 // evening coral
}

export function HourOfDayChart({ activities }: HourOfDayChartProps) {
  const data = useMemo(
    () => computeHourOfDayBreakdown(activities).filter((d) => d.count > 0),
    [activities]
  );

  const chartConfig = {
    count: { label: "Activities", color: "var(--chart-1)" },
  };

  return (
    <ChartCard title="Activity by Hour" description="When during the day people exercise">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1200}>
            {data.map((entry) => (
              <Cell key={entry.hour} fill={getHourColor(entry.hour)} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
