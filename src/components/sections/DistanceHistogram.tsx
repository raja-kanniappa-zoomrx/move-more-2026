import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeDistanceHistogram } from "@/data/metrics";

interface DistanceHistogramProps {
  activities: Activity[];
}

export function DistanceHistogram({ activities }: DistanceHistogramProps) {
  const data = useMemo(() => computeDistanceHistogram(activities), [activities]);

  const chartConfig = {
    count: { label: "Activities", color: "var(--metric-distance)" },
  };

  return (
    <ChartCard title="Distance Distribution" description="Range of distances covered per activity">
      <ChartContainer config={chartConfig} className="h-full min-h-[260px] w-full">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="bin" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--metric-distance)"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
