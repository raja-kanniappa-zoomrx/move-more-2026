import { useMemo } from "react";
import { format, eachWeekOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemePicker } from "@/components/layout/ThemePicker";
import type { ActivityType, Filters } from "@/types";
import type { ThemeName } from "@/config/themes";

interface FilterBarProps {
  filters: Filters;
  participants: string[];
  minDate: Date | null;
  maxDate: Date | null;
  onToggleActivityType: (type: ActivityType) => void;
  onToggleParticipant: (name: string) => void;
  onSetDateRange: (range: [Date | null, Date | null]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  currentTheme: ThemeName;
  onSelectTheme: (name: ThemeName) => void;
}

export function FilterBar({
  filters,
  participants,
  minDate,
  maxDate,
  onToggleActivityType,
  onToggleParticipant,
  onSetDateRange,
  onClear,
  hasActiveFilters,
  activeFilterCount,
  currentTheme,
  onSelectTheme,
}: FilterBarProps) {
  // Build date presets dynamically from the actual data range
  const datePresets = useMemo(() => {
    const presets: { label: string; range: [Date | null, Date | null] }[] = [
      { label: "All Dates", range: [null, null] },
    ];

    if (!minDate || !maxDate) return presets;

    // One entry per calendar week (Mon–Sun) within the data range
    const weekStarts = eachWeekOfInterval(
      { start: minDate, end: maxDate },
      { weekStartsOn: 1 }
    );

    weekStarts.forEach((weekStart, i) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const clampedStart = weekStart < minDate ? minDate : weekStart;
      const clampedEnd = weekEnd > maxDate ? maxDate : weekEnd;
      const label = `Week ${i + 1} (${format(clampedStart, "MMM d")} – ${format(clampedEnd, "MMM d")})`;
      const endOfDay = new Date(clampedEnd);
      endOfDay.setHours(23, 59, 59, 999);
      presets.push({ label, range: [clampedStart, endOfDay] });
    });

    return presets;
  }, [minDate, maxDate]);

  const currentDateLabel =
    datePresets.find(
      (p) =>
        p.range[0]?.getTime() === filters.dateRange[0]?.getTime() &&
        p.range[1]?.getTime() === filters.dateRange[1]?.getTime()
    )?.label || "All Dates";

  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Filters
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 flex-1">
          <Select
            value={currentDateLabel}
            onValueChange={(val) => {
              const preset = datePresets.find((p) => p.label === val);
              if (preset) onSetDateRange(preset.range);
            }}
          >
            <SelectTrigger size="sm" className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {datePresets.map((p) => (
                <SelectItem key={p.label} value={p.label}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={
              filters.participants.length === 1
                ? filters.participants[0]
                : "__all__"
            }
            onValueChange={(val) => {
              if (val === "__all__") {
                for (const p of filters.participants) onToggleParticipant(p);
              } else {
                for (const p of filters.participants) onToggleParticipant(p);
                onToggleParticipant(val);
              }
            }}
          >
            <SelectTrigger size="sm" className="w-[180px]">
              <SelectValue placeholder="All Participants" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Participants</SelectItem>
              {participants.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="shrink-0"
          >
            <X className="size-3" />
            Clear
          </Button>
        )}

        <div className="ml-auto shrink-0">
          <ThemePicker current={currentTheme} onSelect={onSelectTheme} />
        </div>
      </div>
    </div>
  );
}
