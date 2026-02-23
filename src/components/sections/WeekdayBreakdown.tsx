import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeWeekdayBreakdown } from "@/data/metrics";

interface WeekdayBreakdownProps {
  activities: Activity[];
}

export function WeekdayBreakdown({ activities }: WeekdayBreakdownProps) {
  const data = useMemo(() => computeWeekdayBreakdown(activities), [activities]);

  const chartConfig = {
    count: { label: "Activities", color: "var(--chart-1)" },
  };

  return (
    <ChartCard title="Activity by Weekday" description="Which days of the week are most active">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
