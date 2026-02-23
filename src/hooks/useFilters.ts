import { useState, useCallback, useMemo } from "react";
import type { ActivityType, Filters } from "@/types";

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    dateRange: [null, null],
    activityTypes: [],
    participants: [],
  });

  const setDateRange = useCallback(
    (range: [Date | null, Date | null]) => {
      setFilters((prev) => ({ ...prev, dateRange: range }));
    },
    []
  );

  const toggleActivityType = useCallback((type: ActivityType) => {
    setFilters((prev) => ({
      ...prev,
      activityTypes: prev.activityTypes.includes(type)
        ? prev.activityTypes.filter((t) => t !== type)
        : [...prev.activityTypes, type],
    }));
  }, []);

  const toggleParticipant = useCallback((name: string) => {
    setFilters((prev) => ({
      ...prev,
      participants: prev.participants.includes(name)
        ? prev.participants.filter((p) => p !== name)
        : [...prev.participants, name],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      dateRange: [null, null],
      activityTypes: [],
      participants: [],
    });
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      filters.dateRange[0] !== null ||
      filters.dateRange[1] !== null ||
      filters.activityTypes.length > 0 ||
      filters.participants.length > 0,
    [filters]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.dateRange[0] || filters.dateRange[1]) count++;
    count += filters.activityTypes.length;
    count += filters.participants.length;
    return count;
  }, [filters]);

  return {
    filters,
    setDateRange,
    toggleActivityType,
    toggleParticipant,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
