import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeCumulativeDistance } from "@/data/metrics";
import { PARTICIPANT_COLORS } from "@/data/constants";
import type { ChartConfig } from "@/components/ui/chart";

interface CumulativeProgressProps {
  activities: Activity[];
}

export function CumulativeProgress({ activities }: CumulativeProgressProps) {
  const participants = useMemo(
    () => [...new Set(activities.map((a) => a.athleteName))],
    [activities]
  );
  const data = useMemo(() => computeCumulativeDistance(activities), [activities]);

  const chartConfig: ChartConfig = {};
  participants.forEach((p, i) => {
    chartConfig[p] = { label: p, color: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length] };
  });

  const colorMap = useMemo(() => {
    const m: Record<string, string> = {};
    participants.forEach((p, i) => {
      m[p] = PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length];
    });
    return m;
  }, [participants]);

  const SortedTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const sorted = [...payload]
      .filter((e: any) => e.value != null)
      .sort((a: any, b: any) => b.value - a.value);

    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-xl text-xs max-h-[320px] overflow-y-auto min-w-[200px]">
        <div className="font-semibold text-foreground mb-2">{label}</div>
        {sorted.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: colorMap[entry.dataKey] ?? entry.color }}
              />
              <span className="text-muted-foreground truncate">{entry.dataKey}</span>
            </div>
            <span className="font-medium text-foreground tabular-nums">
              {(entry.value as number).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ChartCard
      title="Cumulative Distance Progress"
      description="How each participant accumulated distance over time"
    >
      <ChartContainer config={chartConfig} className="h-full min-h-[300px] w-full">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<SortedTooltip />} />
          {participants.map((p, i) => (
            <Line
              key={p}
              type="monotone"
              dataKey={p}
              stroke={PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length]}
              strokeWidth={1.5}
              dot={false}
              animationDuration={1500}
              animationBegin={i * 100}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </ChartCard>
  );
}
