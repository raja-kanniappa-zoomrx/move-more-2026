import { useMemo } from "react";
import { motion } from "motion/react";
import { Trophy, Medal, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity } from "@/types";
import { computeLeaderboard } from "@/data/metrics";
import { PARTICIPANT_COLORS } from "@/data/constants";

interface LeaderboardProps {
  activities: Activity[];
  displayNames: Map<string, string>;
}

const rankIcons = [
  { icon: Trophy, color: "var(--metric-pace)", bg: "var(--stat-icon-bg-warm)", label: "1st" },
  { icon: Medal, color: "var(--muted-text)", bg: "var(--muted)", label: "2nd" },
  { icon: Award, color: "var(--accent)", bg: "var(--status-warning-bg)", label: "3rd" },
];

export function Leaderboard({ activities, displayNames }: LeaderboardProps) {
  const leaders = useMemo(() => computeLeaderboard(activities), [activities]);

  return (
    <ChartCard
      title="Leaderboard"
      description="Ranked by composite score (consistency + activity + distance)"
    >
      <div className="space-y-2">
        {leaders.map((p, i) => {
          const rank = rankIcons[i];
          const RankIcon = rank?.icon;

          return (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-row-highlight transition-colors"
            >
              {/* Rank */}
              <div className="w-8 flex justify-center shrink-0">
                {RankIcon ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: rank.bg }}
                  >
                    <RankIcon className="size-4" style={{ color: rank.color }} />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    #{i + 1}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
                style={{
                  backgroundColor:
                    PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length],
                }}
              >
                {p.name.charAt(0)}
              </div>

              {/* Name + stats */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{displayNames.get(p.name) ?? p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.totalActivities} activities &middot; {p.uniqueDays} days
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="text-xs">
                  {p.totalDistanceKm} km
                </Badge>
                <div className="text-xs font-mono text-muted-foreground tabular-nums">
                  {Math.round(p.compositeScore)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartCard>
  );
}
