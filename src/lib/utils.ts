import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a map of full name → display name.
 * If a first name is unique across all participants, display name = first name.
 * If two or more participants share a first name, display name = "First L." (last initial).
 */
export function buildDisplayNames(allNames: string[]): Map<string, string> {
  const firstNameCount = new Map<string, number>();
  for (const name of allNames) {
    const first = name.split(" ")[0];
    firstNameCount.set(first, (firstNameCount.get(first) ?? 0) + 1);
  }
  const map = new Map<string, string>();
  for (const name of allNames) {
    const parts = name.split(" ");
    const first = parts[0];
    if ((firstNameCount.get(first) ?? 0) > 1 && parts.length > 1) {
      map.set(name, `${first} ${parts[parts.length - 1].charAt(0)}.`);
    } else {
      map.set(name, first);
    }
  }
  return map;
}
