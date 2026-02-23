import { useMemo } from "react";
import { format } from "date-fns";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeActivityDistances } from "@/data/metrics";

interface PaceDistributionProps {
  activities: Activity[];
}

// Same distance spectrum as the heatmap
const INTENSITY_LEVELS: { upTo: number; color: string; label: string }[] = [
  { upTo: 2,        color: "#3b82f6", label: "<2 km"   },
  { upTo: 5,        color: "#06b6d4", label: "2–5 km"  },
  { upTo: 10,       color: "#22c55e", label: "5–10 km" },
  { upTo: 15,       color: "#a3e635", label: "10–15"   },
  { upTo: 20,       color: "#facc15", label: "15–20"   },
  { upTo: 25,       color: "#f97316", label: "20–25"   },
  { upTo: Infinity, color: "#ef4444", label: "25+ km"  },
];

function getCellColor(distanceKm: number): string {
  const level = INTENSITY_LEVELS.find((l) => distanceKm < l.upTo);
  return level ? level.color : INTENSITY_LEVELS[INTENSITY_LEVELS.length - 1].color;
}

export function PaceDistribution({ activities }: PaceDistributionProps) {
  const allData = useMemo(() => computeActivityDistances(activities), [activities]);

  // Group by participant, sort each person's activities by distance desc
  const rows = useMemo(() => {
    const byParticipant = new Map<string, typeof allData>();
    for (const d of allData) {
      if (!byParticipant.has(d.name)) byParticipant.set(d.name, []);
      byParticipant.get(d.name)!.push(d);
    }
    // Sort each person's activities by distance descending
    for (const acts of byParticipant.values()) {
      acts.sort((a, b) => b.distanceKm - a.distanceKm);
    }
    // Sort rows by total distance descending
    return Array.from(byParticipant.entries())
      .sort((a, b) => {
        const totalA = a[1].reduce((s, d) => s + d.distanceKm, 0);
        const totalB = b[1].reduce((s, d) => s + d.distanceKm, 0);
        return totalB - totalA;
      });
  }, [allData]);

  const maxActivities = useMemo(
    () => Math.max(...rows.map(([, acts]) => acts.length), 0),
    [rows]
  );

  if (allData.length === 0) {
    return (
      <ChartCard title="Activity Distance Ranking" description="Each box is one activity, sorted highest → lowest distance per participant">
        <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
          No distance data available for the current selection
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Activity Distance Ranking"
      description="Each box = one activity, sorted highest → lowest. Rows ordered by total distance."
    >
      <div className="overflow-x-auto -mx-6 px-6">
        <div style={{ minWidth: `${130 + maxActivities * 13}px` }}>
          {/* Rank header */}
          <div className="flex mb-1">
            <div className="w-[130px] shrink-0" />
            <div className="flex gap-[2px] items-center">
              <span className="text-[9px] text-muted-foreground mr-1">#1</span>
              <span className="text-[9px] text-muted-foreground" style={{ marginLeft: `${Math.floor(maxActivities / 2) * 13}px` }}>
                #{Math.floor(maxActivities / 2)}
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map(([name, acts]) => (
            <div key={name} className="flex items-center mb-[3px]">
              <div className="w-[130px] shrink-0 flex items-center gap-1.5 pr-2">
                <span className="text-xs text-foreground truncate">{name.split(" ")[0]}</span>
                <span className="text-[9px] text-muted-foreground shrink-0">{acts.length}</span>
              </div>
              <div className="flex gap-[2px]">
                {acts.map((act, i) => (
                  <div
                    key={i}
                    className="w-[11px] h-[11px] rounded-[2px] shrink-0 hover:ring-1 hover:ring-foreground/30 cursor-default transition-colors"
                    style={{ backgroundColor: getCellColor(act.distanceKm) }}
                    title={`${name} · ${act.distanceKm.toFixed(1)} km · ${act.type} · ${format(new Date(act.dateTs), "MMM d")}`}
                  />
                ))}
                {/* Empty boxes to align rows */}
                {Array.from({ length: maxActivities - acts.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-[11px] h-[11px] rounded-[2px] shrink-0"
                    style={{ backgroundColor: "var(--cell-unmet)" }}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end text-[10px] text-muted-foreground flex-wrap">
            <span className="mr-1">Distance:</span>
            {INTENSITY_LEVELS.map((level) => (
              <div key={level.label} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-[2px] shrink-0" style={{ backgroundColor: level.color }} />
                <span>{level.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
