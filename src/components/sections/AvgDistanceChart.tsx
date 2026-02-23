import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList, ReferenceLine } from "recharts";
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

  const chartHeight = Math.max(300, data.length * 24);

  return (
    <ChartCard title="Average Distance" description="Average distance per activity for each participant">
      <ChartContainer config={chartConfig} className="w-full" style={{ height: chartHeight }}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
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
          <ReferenceLine
            x={avg}
            stroke="var(--accent)"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ value: `Avg: ${avg} km`, position: "insideTopRight", fontSize: 11, fill: "var(--accent)" }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1200}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--chart-5)" />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              className="fill-foreground text-xs"
              formatter={(v: number) => `${v} km`}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
