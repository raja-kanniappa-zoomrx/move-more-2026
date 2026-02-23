import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeActivityTypeBreakdown } from "@/data/metrics";
import { ACTIVITY_COLORS } from "@/data/constants";
import type { ChartConfig } from "@/components/ui/chart";

interface ActivityTypeBreakdownProps {
  activities: Activity[];
}

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--foreground)" fontSize={14} fontWeight={600}>
        {payload.type}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--muted-foreground)" fontSize={12}>
        {value} ({(percent * 100).toFixed(1)}%)
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function ActivityTypeBreakdown({ activities }: ActivityTypeBreakdownProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const data = useMemo(() => computeActivityTypeBreakdown(activities), [activities]);

  const chartConfig: ChartConfig = {};
  data.forEach((d) => {
    chartConfig[d.type] = { label: d.type, color: ACTIVITY_COLORS[d.type] };
  });

  return (
    <ChartCard
      title="Activity Type Breakdown"
      description="Distribution of activities by type"
    >
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="type" />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="count"
            nameKey="type"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
            animationDuration={1500}
            animationBegin={200}
          >
            {data.map((entry) => (
              <Cell
                key={entry.type}
                fill={ACTIVITY_COLORS[entry.type]}
                stroke="var(--card)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="type" />} />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
}
