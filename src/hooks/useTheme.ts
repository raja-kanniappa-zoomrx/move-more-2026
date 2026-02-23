import { useState, useEffect, useCallback } from "react";
import { themes, type ThemeName, type ThemeTokens } from "@/config/themes";

const COOKIE_KEY = "move-more-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookie(): ThemeName {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]+)`)
  );
  const val = match?.[1];
  return val && val in themes ? (val as ThemeName) : "funky";
}

function writeCookie(name: ThemeName) {
  document.cookie = `${COOKIE_KEY}=${name}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

// camelCase → --kebab-case, with digit groups prefixed too
function toVar(key: string): string {
  return (
    "--" +
    key
      .replace(/([A-Z])/g, "-$1")
      .replace(/(\d+)/g, "-$1")
      .toLowerCase()
  );
}

// Tailwind v4 @theme inline bakes --color-* vars at build time from the
// initial :root values. They won't reactively follow runtime style.setProperty
// calls on the underlying --foo vars. So we set both the raw var AND the
// --color-foo alias that Tailwind utility classes actually reference at runtime.
//
// Keys that have a corresponding --color-* entry in @theme inline:
const COLOR_ALIAS_KEYS = new Set([
  "background", "foreground",
  "card", "secondary", "secondaryForeground",
  "muted", "mutedForeground",
  "accent", "accentForeground",
  "destructive", "destructiveForeground",
  "border", "ring",
  "primary", "primaryForeground",
  "primaryDark", "primaryDarkest",
  "accentDark", "mutedText", "placeholder", "disabled",
  "surfaceHover", "borderStrong", "inputBackground", "switchBackground",
  "statusSuccessBg", "statusSuccessText", "statusWarningBg", "secondaryActive",
  "metricDistance", "metricDuration", "metricPace", "metricComplete",
  "leaderboardText", "warning", "warningBg", "warningBorder", "metricIconBg",
  "statIconBgPrimary", "statIconBgDuration", "statIconBgDistance", "statIconBgWarm",
  "statTileValue", "rowHighlight", "borderSubtle",
  "chart1", "chart2", "chart3", "chart4", "chart5",
]);

function applyTheme(tokens: ThemeTokens) {
  const root = document.documentElement;
  const flat = tokens as Record<string, unknown>;

  for (const [key, value] of Object.entries(flat)) {
    if (Array.isArray(value)) continue; // skip avatarPalette
    const val = value as string;
    const cssVar = toVar(key); // e.g. "--primary-dark"

    // Set raw var
    root.style.setProperty(cssVar, val);

    // Set --color-* alias (e.g. "--color-primary-dark")
    if (COLOR_ALIAS_KEYS.has(key)) {
      root.style.setProperty("--color" + cssVar.slice(1), val);
      // cssVar.slice(1) strips the leading '-', giving '-primary-dark'
      // so "--color" + "-primary-dark" = "--color-primary-dark" ✓
    }
  }

  // Derived vars not covered by ThemeTokens
  const t = tokens;
  // card-foreground / popover / popover-foreground → use card & foreground
  root.style.setProperty("--card-foreground", t.foreground);
  root.style.setProperty("--color-card-foreground", t.foreground);
  root.style.setProperty("--popover", t.card);
  root.style.setProperty("--color-popover", t.card);
  root.style.setProperty("--popover-foreground", t.foreground);
  root.style.setProperty("--color-popover-foreground", t.foreground);

  // Radius derived vars (Tailwind @theme inline bakes these at build time)
  const r = t.radius;
  root.style.setProperty("--radius-sm", `calc(${r} - 4px)`);
  root.style.setProperty("--radius-md", `calc(${r} - 2px)`);
  root.style.setProperty("--radius-lg", r);
  root.style.setProperty("--radius-xl", `calc(${r} + 4px)`);
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>("funky");

  // Read cookie on mount and apply
  useEffect(() => {
    const saved = readCookie();
    setThemeState(saved);
    applyTheme(themes[saved]);
  }, []);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name);
    writeCookie(name);
    applyTheme(themes[name]);
  }, []);

  return { theme, setTheme };
}
