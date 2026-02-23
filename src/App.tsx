import { DashboardShell } from "@/components/layout/DashboardShell";
import { FilterBar } from "@/components/layout/FilterBar";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { HeroHeader } from "@/components/sections/HeroHeader";
import { SummaryMetrics } from "@/components/sections/SummaryMetrics";
import { ActivityTimeline } from "@/components/sections/ActivityTimeline";
import { UniqueDaysChart } from "@/components/sections/UniqueDaysChart";
import { TotalDistanceChart } from "@/components/sections/TotalDistanceChart";
import { AvgDistanceChart } from "@/components/sections/AvgDistanceChart";
import { CumulativeProgress } from "@/components/sections/CumulativeProgress";
import { DurationHistogram } from "@/components/sections/DurationHistogram";
import { DistanceHistogram } from "@/components/sections/DistanceHistogram";
import { WeekdayBreakdown } from "@/components/sections/WeekdayBreakdown";
import { ParticipantHeatmap } from "@/components/sections/ParticipantHeatmap";
import { StreakAnalysis } from "@/components/sections/StreakAnalysis";
import { WeekOverWeekTrend } from "@/components/sections/WeekOverWeekTrend";
import { Leaderboard } from "@/components/sections/Leaderboard";
import { ParticipantSummaryTable } from "@/components/sections/ParticipantSummaryTable";
import { useMemo } from "react";
import { useData } from "@/hooks/useData";
import { useFilters } from "@/hooks/useFilters";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, setTheme } = useTheme();

  const {
    filters,
    setDateRange,
    toggleActivityType,
    toggleParticipant,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useFilters();

  const { allActivities, filteredActivities, allParticipants, loading, error } =
    useData(filters);

  const { minDate, maxDate } = useMemo(() => {
    if (allActivities.length === 0) return { minDate: null, maxDate: null };
    const times = allActivities.map((a) => a.date.getTime());
    return {
      minDate: new Date(Math.min(...times)),
      maxDate: new Date(Math.max(...times)),
    };
  }, [allActivities]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading challenge data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive font-medium">Failed to load data</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const activities = filteredActivities;

  return (
    <DashboardShell>
      {/* Hero */}
      <HeroHeader
        minDate={minDate}
        maxDate={maxDate}
        athleteCount={allParticipants.length}
      />

      {/* Filters */}
      <FilterBar
        filters={filters}
        participants={allParticipants}
        minDate={minDate}
        maxDate={maxDate}
        onToggleActivityType={toggleActivityType}
        onToggleParticipant={toggleParticipant}
        onSetDateRange={setDateRange}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        currentTheme={theme}
        onSelectTheme={setTheme}
      />

      {/* Summary Metrics */}
      <SummaryMetrics activities={activities} />

      {/* Activity Timeline */}
      <SectionWrapper>
        <ActivityTimeline activities={activities} />
      </SectionWrapper>

      {/* Participant Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <SectionWrapper>
          <UniqueDaysChart activities={activities} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <TotalDistanceChart activities={activities} />
        </SectionWrapper>
      </div>

      {/* Participant Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <SectionWrapper>
          <AvgDistanceChart activities={activities} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <CumulativeProgress activities={activities} />
        </SectionWrapper>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <SectionWrapper>
          <DurationHistogram activities={activities} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <DistanceHistogram activities={activities} />
        </SectionWrapper>
      </div>

      {/* Temporal Charts */}
      <SectionWrapper>
        <WeekdayBreakdown activities={activities} />
      </SectionWrapper>

      {/* Heatmap */}
      <SectionWrapper>
        <ParticipantHeatmap activities={activities} />
      </SectionWrapper>

      {/* Streaks & Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <SectionWrapper>
          <StreakAnalysis activities={activities} />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <WeekOverWeekTrend activities={activities} />
        </SectionWrapper>
      </div>

      {/* Leaderboard */}
      <SectionWrapper>
        <Leaderboard activities={activities} />
      </SectionWrapper>

      {/* Participant Summary Table */}
      <SectionWrapper>
        <ParticipantSummaryTable activities={activities} />
      </SectionWrapper>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-muted-foreground">
        ZoomRx Move More Challenge 2024 &middot; Data from Strava
      </div>
    </DashboardShell>
  );
}
