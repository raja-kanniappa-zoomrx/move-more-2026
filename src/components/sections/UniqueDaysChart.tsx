import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeParticipantUniqueDays } from "@/data/metrics";

interface UniqueDaysChartProps {
  activities: Activity[];
}

export function UniqueDaysChart({ activities }: UniqueDaysChartProps) {
  const data = useMemo(() => computeParticipantUniqueDays(activities), [activities]);

  const chartConfig = {
    value: { label: "Unique Days", color: "var(--chart-1)" },
  };

  return (
    <ChartCard title="Unique Activity Days" description="Days each participant was active">
      <ChartContainer config={chartConfig} className="h-full min-h-[300px] w-full">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1200}>
            {data.map((_, i) => (
              <Cell key={i} fill="var(--chart-1)" />
            ))}
            <LabelList dataKey="value" position="right" className="fill-foreground text-xs" />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
