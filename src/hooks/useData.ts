import { useState, useEffect, useMemo } from "react";
import type { Activity, Filters } from "@/types";
import { loadAndParseCSV } from "@/data/parser";
import { INCLUDED_RAW_TYPES, CHALLENGE_START, CHALLENGE_END } from "@/data/constants";
import { buildDisplayNames } from "@/lib/utils";

export function useData(filters: Filters) {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAndParseCSV()
      .then((data) => {
        setAllActivities(
          data.filter(
            (a) =>
              INCLUDED_RAW_TYPES.has(a.type) &&
              a.date >= CHALLENGE_START &&
              a.date <= CHALLENGE_END
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredActivities = useMemo(() => {
    return allActivities.filter((a) => {
      if (filters.dateRange[0] && a.date < filters.dateRange[0]) return false;
      if (filters.dateRange[1] && a.date > filters.dateRange[1]) return false;
      if (
        filters.activityTypes.length > 0 &&
        !filters.activityTypes.includes(a.type)
      )
        return false;
      if (
        filters.participants.length > 0 &&
        !filters.participants.includes(a.athleteName)
      )
        return false;
      return true;
    });
  }, [allActivities, filters]);

  const allParticipants = useMemo(
    () =>
      [...new Set(allActivities.map((a) => a.athleteName))].sort(),
    [allActivities]
  );

  const displayNames = useMemo(
    () => buildDisplayNames(allParticipants),
    [allParticipants]
  );

  return {
    allActivities,
    filteredActivities,
    allParticipants,
    displayNames,
    loading,
    error,
  };
}
