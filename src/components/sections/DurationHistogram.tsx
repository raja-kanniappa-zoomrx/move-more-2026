import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeDurationHistogram } from "@/data/metrics";

interface DurationHistogramProps {
  activities: Activity[];
}

export function DurationHistogram({ activities }: DurationHistogramProps) {
  const data = useMemo(() => computeDurationHistogram(activities), [activities]);

  const chartConfig = {
    count: { label: "Activities", color: "var(--metric-duration)" },
  };

  return (
    <ChartCard title="Duration Distribution" description="How long activities typically last">
      <ChartContainer config={chartConfig} className="h-full min-h-[260px] w-full">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="bin" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--metric-duration)"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
