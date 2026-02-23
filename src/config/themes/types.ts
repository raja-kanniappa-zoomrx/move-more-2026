export type ThemeTokens = {
  // brand
  primary: string;
  primaryDark: string;
  primaryDarkest: string;
  primaryForeground: string;
  accent: string;
  accentDark: string;
  accentForeground: string;
  // surfaces
  background: string;
  card: string;
  secondary: string;
  secondaryForeground: string;
  secondaryActive: string;
  muted: string;
  mutedForeground: string;
  inputBackground: string;
  surfaceHover: string;
  // text
  foreground: string;
  mutedText: string;
  placeholder: string;
  disabled: string;
  // borders & interactive
  border: string;
  borderStrong: string;
  switchBackground: string;
  ring: string;
  // status
  destructive: string;
  destructiveForeground: string;
  statusSuccessBg: string;
  statusSuccessText: string;
  statusWarningBg: string;
  // charts
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  // metric indicators (per-feature semantic colors)
  metricDistance: string;
  metricDuration: string;
  metricPace: string;
  metricComplete: string;
  leaderboardText: string;
  // warning / at-risk
  warning: string;
  warningBg: string;
  warningBorder: string;
  // metric-section UI
  metricIconBg: string;
  metricSectionBgWarm: string;
  metricSectionBgCool: string;
  metricDividerGold: string;
  metricSectionHover: string;
  metricSliderTrack: string;
  metricDividerGreen: string;
  // rules section
  rulesBg: string;
  rulesHover: string;
  // notice / ended-program
  noticeBg: string;
  noticeBorder: string;
  noticeText: string;
  noticeAccent: string;
  // destructive-soft
  destructiveSoft: string;
  destructiveSoftBg: string;
  // hover / interaction
  surfaceHoverSubtle: string;
  surfaceHoverWarm: string;
  // unmet-state / table
  cellUnmet: string;
  borderSubtle: string;
  rowHighlight: string;
  // device disconnection
  disconnectBg: string;
  // strava badge tint
  stravaBg: string;
  // stat-tile icon backgrounds (ActiveProgramDashboard, MemberProgramDetails StatTile)
  statIconBgPrimary: string;   // calendar, activity icons — green tint
  statIconBgDuration: string;  // users, timer icons — purple tint
  statIconBgDistance: string;  // route, layers icons — blue tint
  statIconBgWarm: string;      // distance-km in split view — warm/orange tint
  // stat-tile value text (the big number in Days/Runners/Splits/Activities tiles)
  statTileValue: string;
  // horizontal scroll fade (gradient overlay matching page background for split pill row)
  scrollFadeBg: string;
  // avatar palette — varied colors for member avatar circles (getAvatarColor picks by index)
  avatarPalette: string[];
  // layout
  radius: string;
};
