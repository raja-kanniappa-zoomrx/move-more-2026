import type { ThemeTokens } from './types';

export const funky: ThemeTokens = {
  // ─── Brand ───────────────────────────────────────────────────────────────
  // primary: main buttons, active states, rings, badges, pill backgrounds
  primary: '#e91e8c',
  // primaryDark: hover state for primary buttons
  primaryDark: '#c4177a',
  // primaryDarkest: pressed / deepest brand surface
  primaryDarkest: '#8c0f57',
  // primaryForeground: text/icon on top of primary bg
  primaryForeground: '#ffffff',
  // accent: secondary highlight color, e.g. join-program icon tint
  accent: '#ffe600',
  // accentDark: hover state for accent elements
  accentDark: '#d4bf00',
  // accentForeground: text/icon on top of accent bg
  accentForeground: '#1a1a1a',

  // ─── Surfaces ────────────────────────────────────────────────────────────
  // background: app-level page background (body bg)
  background: '#0f0f1a',
  // card: elevated card / sheet surfaces
  card: '#1a1a2e',
  // secondary: secondary button bg, section bg tint
  secondary: '#2a1a3e',
  // secondaryForeground: text/icon on secondary bg
  secondaryForeground: '#e91e8c',
  // secondaryActive: pressed state for secondary buttons
  secondaryActive: '#3d1f5c',
  // muted: subtle surface for chips, tags, input wrappers
  muted: '#1f1f35',
  // mutedForeground: text on muted surfaces (descriptions, captions)
  mutedForeground: '#9a8fb5',
  // inputBackground: text input field fill
  inputBackground: '#1f1f35',
  // surfaceHover: hover overlay on interactive cards/rows
  surfaceHover: '#2a2a45',

  // ─── Text ────────────────────────────────────────────────────────────────
  // foreground: primary body text
  foreground: '#f0e6ff',
  // mutedText: secondary/supporting text (stat row labels, sub-labels)
  mutedText: '#b0a0cc',
  // placeholder: input placeholder text
  placeholder: '#6a5d85',
  // disabled: disabled text AND stat-tile labels (DAYS, RUNNERS, SPLITS etc.)
  disabled: '#9a8fb5',

  // ─── Borders & Interactive ───────────────────────────────────────────────
  // border: default card/input border
  border: '#3a2a55',
  // borderStrong: dividers, stronger separators
  borderStrong: '#4d3870',
  // switchBackground: toggle switch track (off state)
  switchBackground: '#3a3060',
  // ring: focus ring on inputs and interactive elements
  ring: '#e91e8c',

  // ─── Status ──────────────────────────────────────────────────────────────
  // destructive: delete/error actions (buttons, text)
  destructive: '#ff2d55',
  // destructiveForeground: text/icon on destructive bg
  destructiveForeground: '#ffffff',
  // statusSuccessBg: success badge background (e.g. "Active" badge bg)
  statusSuccessBg: '#1a3a2e',
  // statusSuccessText: success badge text
  statusSuccessText: '#4ade80',
  // statusWarningBg: warning badge / pending state background
  statusWarningBg: '#3a2a10',

  // ─── Charts ──────────────────────────────────────────────────────────────
  // chart1–5: data visualisation series colors
  chart1: '#e91e8c',
  chart2: '#ffe600',
  chart3: '#00e5ff',
  chart4: '#76ff03',
  chart5: '#ff6d00',

  // ─── Metric Indicators ───────────────────────────────────────────────────
  // metricDistance: distance metric text/icon color
  metricDistance: '#00e5ff',
  // metricDuration: duration/time metric text/icon color
  metricDuration: '#d500f9',
  // metricPace: pace metric text/icon color
  metricPace: '#ffe600',
  // metricComplete: completion/check metric color
  metricComplete: '#76ff03',
  // leaderboardText: leaderboard rank/name text
  leaderboardText: '#f0e6ff',

  // ─── Warning / At-Risk ───────────────────────────────────────────────────
  // warning: at-risk / overdue warning text and icons (EdgeStates)
  warning: '#ff9100',
  // warningBg: background of warning banners/cards
  warningBg: '#1f1200',
  // warningBorder: border of warning banners/cards
  warningBorder: '#5c3000',

  // ─── Metric-Section UI (SplitDetails) ────────────────────────────────────
  // metricIconBg: icon container bg in metric detail sections
  metricIconBg: '#2a1f00',
  // metricSectionBgWarm: warm-tinted metric section card bg
  metricSectionBgWarm: '#1f0a1a',
  // metricSectionBgCool: cool-tinted metric section card bg
  metricSectionBgCool: '#0a1f2a',
  // metricDividerGold: gold-tone divider lines in metric sections
  metricDividerGold: '#5c4a00',
  // metricSectionHover: hover state for metric section rows
  metricSectionHover: '#2a2000',
  // metricSliderTrack: range slider track color in metric config
  metricSliderTrack: '#3a1f3a',
  // metricDividerGreen: green-tone divider lines in metric sections
  metricDividerGreen: '#0a3a1f',

  // ─── Rules Section ───────────────────────────────────────────────────────
  // rulesBg: background of program rules list
  rulesBg: '#161626',
  // rulesHover: hover row bg in rules list
  rulesHover: '#20203a',

  // ─── Notice / Ended-Program ──────────────────────────────────────────────
  // noticeBg: ended/expired program notice card bg
  noticeBg: '#1a0f1f',
  // noticeBorder: ended/expired program notice card border
  noticeBorder: '#4d1f60',
  // noticeText: body text inside notice cards
  noticeText: '#d580ff',
  // noticeAccent: highlighted/accent text inside notice cards
  noticeAccent: '#ffe600',

  // ─── Destructive-Soft ────────────────────────────────────────────────────
  // destructiveSoft: softer red for inline delete text/icons (UserProfile)
  destructiveSoft: '#ff4d6d',
  // destructiveSoftBg: soft red tint bg for delete zones
  destructiveSoftBg: '#1a0010',

  // ─── Hover / Interaction ─────────────────────────────────────────────────
  // surfaceHoverSubtle: very subtle hover on list items / sidebar rows
  surfaceHoverSubtle: '#1c1c30',
  // surfaceHoverWarm: neutral warm hover (profile sections)
  surfaceHoverWarm: '#201520',

  // ─── Unmet-State / Table ─────────────────────────────────────────────────
  // cellUnmet: background of unmet/empty table cells
  cellUnmet: '#161620',
  // borderSubtle: very light dividers inside tables
  borderSubtle: '#2a2040',
  // rowHighlight: highlighted row background (active member row etc.)
  rowHighlight: '#1a1a30',

  // ─── Device Disconnection ────────────────────────────────────────────────
  // disconnectBg: background of device-disconnected warning banner
  disconnectBg: '#1a0a0f',

  // ─── Strava Badge ────────────────────────────────────────────────────────
  // stravaBg: background tint behind Strava logo/badge
  stravaBg: '#1f0f00',

  // ─── Stat-Tile Icon Backgrounds ──────────────────────────────────────────
  // statIconBgPrimary: icon pill bg for primary/activity/calendar stat tiles
  statIconBgPrimary: '#2a1a3e',
  // statIconBgDuration: icon pill bg for users/timer/duration stat tiles
  statIconBgDuration: '#2a0a40',
  // statIconBgDistance: icon pill bg for route/distance/layers stat tiles
  statIconBgDistance: '#0a2040',
  // statIconBgWarm: icon pill bg for warm-tint distance stat tile (split view)
  statIconBgWarm: '#2a1a00',
  // statTileValue: big number text color in stat tiles (Days, Runners, Splits etc.)
  statTileValue: '#f0e6ff',
  // scrollFadeBg: gradient fade color for horizontal split pill scroll row (matches background)
  scrollFadeBg: '#0f0f1a',
  // avatarPalette: varied colors for member avatar circles
  avatarPalette: ['#e91e8c', '#d500f9', '#00e5ff', '#ff6d00', '#76ff03', '#ffe600', '#7c4dff', '#ff4081', '#00bcd4', '#ff9100', '#40c4ff', '#ea80fc'],

  // ─── Layout ──────────────────────────────────────────────────────────────
  radius: '1rem',
};
