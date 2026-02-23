import { useMemo, useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { ChartCard } from "@/components/shared/ChartCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Activity } from "@/types";

interface ParticipantHeatmapProps {
  activities: Activity[];
}

// Spectrum: blue → teal → green → lime → yellow → orange → red
const INTENSITY_LEVELS: { upTo: number; color: string; label: string }[] = [
  { upTo: 2,        color: "#3b82f6", label: "<2 km"   },
  { upTo: 5,        color: "#06b6d4", label: "2–5 km"  },
  { upTo: 10,       color: "#22c55e", label: "5–10 km" },
  { upTo: 15,       color: "#a3e635", label: "10–15"   },
  { upTo: 20,       color: "#facc15", label: "15–20"   },
  { upTo: 25,       color: "#f97316", label: "20–25"   },
  { upTo: Infinity, color: "#ef4444", label: "25+ km"  },
];

function getCellColor(distKm: number): string {
  if (distKm === 0) return "var(--cell-unmet)";
  const level = INTENSITY_LEVELS.find((l) => distKm < l.upTo);
  return level ? level.color : INTENSITY_LEVELS[INTENSITY_LEVELS.length - 1].color;
}

type View = "distance" | "streak" | "efforts" | "activeDays";

const VIEWS: { key: View; label: string }[] = [
  { key: "distance",   label: "Distance"    },
  { key: "activeDays", label: "Active days" },
  { key: "streak",     label: "Streak"      },
  { key: "efforts",    label: "Efforts"     },
];

const DESCRIPTIONS: Record<View, string> = {
  distance:   "Each row is a person, each column a day. Colour = distance — red is a long effort, blue is short, grey is a rest day. Rows sorted by total km.",
  streak:     "Same colour scale as Distance. Rows ordered by longest consecutive active-day streak — look for unbroken colour runs from left to right.",
  efforts:    "Each box is one active day's total distance, arranged highest → lowest (left to right). Rows sorted by total km.",
  activeDays: "Same colour scale as Distance. Rows ordered by number of days with any activity recorded.",
};

export function ParticipantHeatmap({ activities }: ParticipantHeatmapProps) {
  const [view, setView] = useState<View>("distance");

  const days = useMemo(() => {
    if (activities.length === 0) return [];
    const times = activities.map((a) => a.date.getTime());
    return eachDayOfInterval({
      start: new Date(Math.min(...times)),
      end: new Date(Math.max(...times)),
    });
  }, [activities]);

  // Per-participant metrics
  const participantStats = useMemo(() => {
    const distMap = new Map<string, Map<string, number>>();
    const countMap = new Map<string, Map<string, number>>();

    for (const a of activities) {
      if (!distMap.has(a.athleteName)) distMap.set(a.athleteName, new Map());
      if (!countMap.has(a.athleteName)) countMap.set(a.athleteName, new Map());
      const dm = distMap.get(a.athleteName)!;
      const cm = countMap.get(a.athleteName)!;
      dm.set(a.dateKey, (dm.get(a.dateKey) || 0) + (a.distanceKm || 0));
      cm.set(a.dateKey, (cm.get(a.dateKey) || 0) + 1);
    }

    const allDateKeys = days.map((d) => format(d, "yyyy-MM-dd"));

    return Array.from(distMap.keys()).map((name) => {
      const dm = distMap.get(name)!;
      const cm = countMap.get(name)!;
      const totalDist = [...dm.values()].reduce((s, v) => s + v, 0);
      const activeDays = dm.size;

      // Longest streak
      let streak = 0, best = 0;
      for (const dk of allDateKeys) {
        if (dm.has(dk)) { streak++; best = Math.max(best, streak); }
        else { streak = 0; }
      }

      return { name, totalDist, activeDays, streak, distMap: dm, countMap: cm };
    });
  }, [activities, days]);

  const sortedParticipants = useMemo(() => {
    return [...participantStats].sort((a, b) => {
      if (view === "streak")     return b.streak - a.streak;
      if (view === "activeDays") return b.activeDays - a.activeDays;
      return b.totalDist - a.totalDist; // distance + rank
    });
  }, [participantStats, view]);

  // Efforts view: per-participant daily totals sorted by distance desc
  // Each entry = { dateKey, distKm, count } — one box per active day
  const effortsData = useMemo(() => {
    if (view !== "efforts") return null;
    return new Map(
      participantStats.map((p) => {
        const days = Array.from(p.distMap.entries())
          .filter(([, km]) => km > 0)
          .map(([dk, km]) => ({ dateKey: dk, distKm: km, count: p.countMap.get(dk) ?? 0 }))
          .sort((a, b) => b.distKm - a.distKm);
        return [p.name, days] as const;
      })
    );
  }, [participantStats, view]);

  const maxEffortDays = useMemo(() => {
    if (!effortsData) return 0;
    return Math.max(...Array.from(effortsData.values()).map((d) => d.length), 0);
  }, [effortsData]);

  const controls = (
    <div className="flex rounded-md border border-border overflow-hidden shrink-0">
      {VIEWS.map((v) => (
        <button
          key={v.key}
          onClick={() => setView(v.key)}
          className={`px-2 py-1 text-[10px] transition-colors whitespace-nowrap ${
            view === v.key
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-muted-foreground hover:bg-muted"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );

  return (
    <ChartCard title="Activity Heatmap" description={DESCRIPTIONS[view]} action={controls}>
      <div className="overflow-x-auto -mx-6 px-6">
        <TooltipProvider delayDuration={0}>
        {view === "efforts" ? (
          /* ── Efforts view: one cell per active day, sorted highest → lowest ── */
          <div className="min-w-[700px]">
            <div className="flex mb-1">
              <div className="w-[130px] shrink-0" />
              <span className="text-[9px] text-muted-foreground">#1 (highest day)</span>
            </div>

            <AnimatePresence initial={false}>
              {sortedParticipants.map((p, i) => {
                const dayEntries = effortsData?.get(p.name) ?? [];
                return (
                  <motion.div
                    key={p.name}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.015, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center mb-0.5"
                  >
                    <div className="w-[130px] shrink-0 flex items-center gap-1.5 pr-2">
                      <span className="text-xs text-foreground truncate">{p.name.split(" ")[0]}</span>
                      <span className="text-[9px] text-muted-foreground shrink-0">{dayEntries.length}d</span>
                    </div>
                    <div className="flex-1 flex gap-[1px]">
                      {dayEntries.map((day, di) => (
                        <Tooltip key={di}>
                          <TooltipTrigger asChild>
                            <div
                              className="flex-1 aspect-square rounded-[2px] min-w-[8px] hover:ring-1 hover:ring-foreground/30 cursor-default transition-colors"
                              style={{ backgroundColor: getCellColor(day.distKm) }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {p.name.split(" ")[0]} · {format(new Date(day.dateKey), "MMM d")} · {day.distKm.toFixed(1)} km · {day.count} {day.count === 1 ? "activity" : "activities"}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                      {Array.from({ length: maxEffortDays - dayEntries.length }).map((_, ei) => (
                        <div
                          key={`e-${ei}`}
                          className="flex-1 aspect-square rounded-[2px] min-w-[8px]"
                          style={{ backgroundColor: "var(--cell-unmet)" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

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
        ) : (
          /* ── Calendar views: date columns ── */
          <div className="min-w-[700px]">
            {/* Date headers */}
            <div className="flex mb-1">
              <div className="w-[130px] shrink-0" />
              <div className="flex-1 flex">
                {days.map((day, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-[8px] text-muted-foreground"
                    title={format(day, "MMM d")}
                  >
                    {i % 7 === 0 ? format(day, "M/d") : ""}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows — animated reorder */}
            <div className="relative">
              <AnimatePresence initial={false}>
                {sortedParticipants.map((p, i) => {
                  const dateKeys = days.map((d) => format(d, "yyyy-MM-dd"));
                  const badge =
                    view === "streak"     ? `${p.streak}d` :
                    view === "activeDays" ? `${p.activeDays}d` :
                    `${p.totalDist.toFixed(0)}km`;
                  return (
                    <motion.div
                      key={p.name}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.015, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center mb-0.5"
                    >
                      <div className="w-[130px] shrink-0 flex items-center gap-1.5 pr-2">
                        <span className="text-xs text-foreground truncate">{p.name.split(" ")[0]}</span>
                        <span className="text-[9px] text-muted-foreground shrink-0">{badge}</span>
                      </div>
                      <div className="flex-1 flex gap-[1px]">
                        {dateKeys.map((dk, di) => {
                          const dist = p.distMap.get(dk) || 0;
                          const count = p.countMap.get(dk) || 0;
                          const label = dist === 0
                            ? "Rest day"
                            : `${dist.toFixed(1)} km · ${count} ${count === 1 ? "activity" : "activities"}`;
                          return (
                            <Tooltip key={di}>
                              <TooltipTrigger asChild>
                                <div
                                  className="flex-1 aspect-square rounded-[2px] transition-colors hover:ring-1 hover:ring-foreground/30 cursor-default min-w-[8px]"
                                  style={{ backgroundColor: getCellColor(dist) }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                {p.name.split(" ")[0]} · {format(days[di], "MMM d")} · {label}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 justify-end text-[10px] text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1 mr-1">
                <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: "var(--cell-unmet)" }} />
                <span>none</span>
              </div>
              {INTENSITY_LEVELS.map((level) => (
                <div key={level.label} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-[2px] shrink-0" style={{ backgroundColor: level.color }} />
                  <span>{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        </TooltipProvider>
      </div>
    </ChartCard>
  );
}
