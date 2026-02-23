import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a map of full name → display name.
 * - Unique first name → show first name only.
 * - Shared first name → try "First X." (last initial), expanding to "First Xx.",
 *   "First Xxx." etc. until each person in the group has a unique display name.
 */
export function buildDisplayNames(allNames: string[]): Map<string, string> {
  // Group names by first name
  const groups = new Map<string, string[]>();
  for (const name of allNames) {
    const first = name.split(" ")[0];
    if (!groups.has(first)) groups.set(first, []);
    groups.get(first)!.push(name);
  }

  const map = new Map<string, string>();

  for (const [first, group] of groups) {
    if (group.length === 1) {
      // Unique first name — just use it
      map.set(group[0], first);
    } else {
      // Try increasing suffix lengths of the last word until all are unique
      let len = 1;
      while (true) {
        const candidates = group.map((name) => {
          const parts = name.split(" ");
          const last = parts[parts.length - 1];
          const suffix = last.slice(0, len);
          return `${first} ${suffix}.`;
        });
        const unique = new Set(candidates).size === candidates.length;
        if (unique || len >= 10) {
          group.forEach((name, i) => map.set(name, candidates[i]));
          break;
        }
        len++;
      }
    }
  }

  return map;
}
