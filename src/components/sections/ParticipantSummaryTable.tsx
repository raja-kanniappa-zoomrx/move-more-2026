import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/shared/ChartCard";
import type { Activity, ParticipantSummary } from "@/types";
import { computeParticipantTable } from "@/data/metrics";
import { ACTIVITY_COLORS } from "@/data/constants";

interface ParticipantSummaryTableProps {
  activities: Activity[];
  displayNames: Map<string, string>;
}

type SortKey = keyof ParticipantSummary;

export function ParticipantSummaryTable({
  activities,
  displayNames,
}: ParticipantSummaryTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("totalActivities");
  const [sortAsc, setSortAsc] = useState(false);

  const data = useMemo(() => computeParticipantTable(activities), [activities]);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const columns: { key: SortKey; label: string; format?: (v: any) => string }[] = [
    { key: "name", label: "Name" },
    { key: "totalActivities", label: "Activities" },
    { key: "totalDistanceKm", label: "Distance (km)" },
    {
      key: "totalDurationMinutes",
      label: "Duration (hrs)",
      format: (v: number) => (v / 60).toFixed(1),
    },
    { key: "uniqueDays", label: "Active Days" },
    { key: "avgDistancePerActivity", label: "Avg Dist" },
    { key: "longestStreak", label: "Streak" },
    { key: "favoriteActivity", label: "Favorite" },
  ];

  return (
    <ChartCard
      title="Participant Summary"
      description="Click column headers to sort"
    >
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="cursor-pointer select-none hover:text-primary transition-colors"
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  <ArrowUpDown className="size-3 text-muted-foreground" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.name} className="hover:bg-row-highlight">
              <TableCell className="font-medium">{displayNames.get(row.name) ?? row.name}</TableCell>
              <TableCell>{row.totalActivities}</TableCell>
              <TableCell>{row.totalDistanceKm}</TableCell>
              <TableCell>{(row.totalDurationMinutes / 60).toFixed(1)}</TableCell>
              <TableCell>{row.uniqueDays}</TableCell>
              <TableCell>{row.avgDistancePerActivity}</TableCell>
              <TableCell>{row.longestStreak}d</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor: ACTIVITY_COLORS[row.favoriteActivity] + "20",
                    color: ACTIVITY_COLORS[row.favoriteActivity],
                  }}
                >
                  {row.favoriteActivity}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ChartCard>
  );
}
