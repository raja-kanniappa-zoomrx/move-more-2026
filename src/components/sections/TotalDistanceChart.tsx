import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeParticipantTotalDistance } from "@/data/metrics";

interface TotalDistanceChartProps {
  activities: Activity[];
  displayNames: Map<string, string>;
}

export function TotalDistanceChart({ activities, displayNames }: TotalDistanceChartProps) {
  const data = useMemo(() => computeParticipantTotalDistance(activities), [activities]);

  const chartConfig = {
    value: { label: "Distance (km)", color: "var(--metric-distance)" },
  };

  return (
    <ChartCard title="Total Distance" description="Cumulative distance per participant (km)">
      <ChartContainer config={chartConfig} className="h-full min-h-[300px] w-full">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
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
          <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1200}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--metric-distance)" />
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
