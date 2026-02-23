import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeParticipantAvgDistance } from "@/data/metrics";

interface AvgDistanceChartProps {
  activities: Activity[];
  displayNames: Map<string, string>;
}

export function AvgDistanceChart({ activities, displayNames }: AvgDistanceChartProps) {
  const data = useMemo(() => computeParticipantAvgDistance(activities), [activities]);
  const avg = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.round((data.reduce((s, d) => s + d.value, 0) / data.length) * 10) / 10;
  }, [data]);

  const chartConfig = {
    value: { label: "Avg Distance (km)", color: "var(--chart-5)" },
  };

  return (
    <ChartCard title="Average Distance" description="Average distance per activity for each participant">
      <ChartContainer config={chartConfig} className="h-full min-h-[300px] w-full">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
            tickFormatter={(v: string) => displayNames.get(v) ?? v}
          />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ReferenceLine
            y={avg}
            stroke="var(--accent)"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ value: `Avg: ${avg} km`, position: "insideTopRight", fontSize: 11, fill: "var(--accent)" }}
          />
          <Bar
            dataKey="value"
            fill="var(--chart-5)"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
