import type { ThemeTokens } from './types';

export const fitmonks: ThemeTokens = {
  // ─── Brand ───────────────────────────────────────────────────────────────
  // primary: main buttons, active states, rings, badges, pill backgrounds
  primary: '#568265',
  // primaryDark: hover state for primary buttons
  primaryDark: '#436850',
  // primaryDarkest: pressed / deepest brand surface
  primaryDarkest: '#2f4d39',
  // primaryForeground: text/icon on top of primary bg
  primaryForeground: '#ffffff',
  // accent: destructive-adjacent highlights (orange-red), e.g. join-program icon tint
  accent: '#fb6e52',
  // accentDark: hover state for accent elements
  accentDark: '#e45f45',
  // accentForeground: text/icon on top of accent bg
  accentForeground: '#ffffff',

  // ─── Surfaces ────────────────────────────────────────────────────────────
  // background: app-level page background (body bg)
  background: '#f2f6eb',
  // card: elevated card / sheet surfaces
  card: '#ffffff',
  // secondary: secondary button bg, section bg tint
  secondary: '#e8f0eb',
  // secondaryForeground: text/icon on secondary bg
  secondaryForeground: '#568265',
  // secondaryActive: pressed state for secondary buttons
  secondaryActive: '#c2d6c9',
  // muted: subtle surface for chips, tags, input wrappers
  muted: '#eef1ef',
  // mutedForeground: text on muted surfaces (descriptions, captions)
  mutedForeground: '#7a847d',
  // inputBackground: text input field fill
  inputBackground: '#eef1ef',
  // surfaceHover: hover overlay on interactive cards/rows
  surfaceHover: '#e8ebe9',

  // ─── Text ────────────────────────────────────────────────────────────────
  // foreground: primary body text
  foreground: '#1a1f1c',
  // mutedText: secondary/supporting text (stat row labels, sub-labels)
  mutedText: '#5a635d',
  // placeholder: input placeholder text
  placeholder: '#a3aba6',
  // disabled: disabled text AND stat-tile labels (DAYS, RUNNERS, SPLITS etc.)
  disabled: '#b0b7b2',

  // ─── Borders & Interactive ───────────────────────────────────────────────
  // border: default card/input border
  border: '#e0e4e1',
  // borderStrong: dividers, stronger separators
  borderStrong: '#d5dbd7',
  // switchBackground: toggle switch track (off state)
  switchBackground: '#c5cbc7',
  // ring: focus ring on inputs and interactive elements
  ring: '#568265',

  // ─── Status ──────────────────────────────────────────────────────────────
  // destructive: delete/error actions (buttons, text)
  destructive: '#d94f33',
  // destructiveForeground: text/icon on destructive bg
  destructiveForeground: '#ffffff',
  // statusSuccessBg: success badge background (e.g. "Active" badge bg)
  statusSuccessBg: '#d5e3da',
  // statusSuccessText: success badge text
  statusSuccessText: '#436850',
  // statusWarningBg: warning badge / pending state background
  statusWarningBg: '#fde8e3',

  // ─── Charts ──────────────────────────────────────────────────────────────
  // chart1–5: data visualisation series colors
  chart1: '#568265',
  chart2: '#fb6e52',
  chart3: '#ffce55',
  chart4: '#dbf58e',
  chart5: '#92c3a4',

  // ─── Metric Indicators ───────────────────────────────────────────────────
  // metricDistance: distance metric text/icon color (blue)
  metricDistance: '#3d8fbf',
  // metricDuration: duration/time metric text/icon color (purple)
  metricDuration: '#7c6bb5',
  // metricPace: pace metric text/icon color (gold)
  metricPace: '#d4a843',
  // metricComplete: completion/check metric color (soft green)
  metricComplete: '#8aab93',
  // leaderboardText: leaderboard rank/name text
  leaderboardText: '#3d4840',

  // ─── Warning / At-Risk ───────────────────────────────────────────────────
  // warning: at-risk / overdue warning text and icons (EdgeStates)
  warning: '#e68a3a',
  // warningBg: background of warning banners/cards
  warningBg: '#fef6f0',
  // warningBorder: border of warning banners/cards
  warningBorder: '#f5e0ce',

  // ─── Metric-Section UI (SplitDetails) ────────────────────────────────────
  // metricIconBg: icon container bg in metric detail sections
  metricIconBg: '#fdf5e0',
  // metricSectionBgWarm: warm-tinted metric section card bg
  metricSectionBgWarm: '#fef7f5',
  // metricSectionBgCool: cool-tinted metric section card bg
  metricSectionBgCool: '#eef5f0',
  // metricDividerGold: gold-tone divider lines in metric sections
  metricDividerGold: '#ede3c8',
  // metricSectionHover: hover state for metric section rows
  metricSectionHover: '#fef9ed',
  // metricSliderTrack: range slider track color in metric config
  metricSliderTrack: '#e8dbd8',
  // metricDividerGreen: green-tone divider lines in metric sections
  metricDividerGreen: '#d9e8dd',

  // ─── Rules Section ───────────────────────────────────────────────────────
  // rulesBg: background of program rules list
  rulesBg: '#f7f9f7',
  // rulesHover: hover row bg in rules list
  rulesHover: '#f0f4f0',

  // ─── Notice / Ended-Program ──────────────────────────────────────────────
  // noticeBg: ended/expired program notice card bg
  noticeBg: '#f7f0ee',
  // noticeBorder: ended/expired program notice card border
  noticeBorder: '#f0ddd9',
  // noticeText: body text inside notice cards
  noticeText: '#a87060',
  // noticeAccent: highlighted/accent text inside notice cards
  noticeAccent: '#c07a2a',

  // ─── Destructive-Soft ────────────────────────────────────────────────────
  // destructiveSoft: softer red for inline delete text/icons (UserProfile)
  destructiveSoft: '#e05252',
  // destructiveSoftBg: soft red tint bg for delete zones
  destructiveSoftBg: '#fff5f5',

  // ─── Hover / Interaction ─────────────────────────────────────────────────
  // surfaceHoverSubtle: very subtle hover on list items / sidebar rows
  surfaceHoverSubtle: '#f7f9f5',
  // surfaceHoverWarm: neutral warm hover (profile sections)
  surfaceHoverWarm: '#f5f5f5',

  // ─── Unmet-State / Table ─────────────────────────────────────────────────
  // cellUnmet: background of unmet/empty table cells
  cellUnmet: '#f5f7f5',
  // borderSubtle: very light dividers inside tables
  borderSubtle: '#f0f3f1',
  // rowHighlight: highlighted row background (active member row etc.)
  rowHighlight: '#f2f7f4',

  // ─── Device Disconnection ────────────────────────────────────────────────
  // disconnectBg: background of device-disconnected warning banner
  disconnectBg: '#fef2f0',

  // ─── Strava Badge ────────────────────────────────────────────────────────
  // stravaBg: background tint behind Strava logo/badge
  stravaBg: '#fff1ec',

  // ─── Stat-Tile Icon Backgrounds ──────────────────────────────────────────
  // statIconBgPrimary: icon pill bg for primary/activity/calendar stat tiles
  statIconBgPrimary: '#e8f0eb',
  // statIconBgDuration: icon pill bg for users/timer/duration stat tiles
  statIconBgDuration: '#f0eef8',
  // statIconBgDistance: icon pill bg for route/distance/layers stat tiles
  statIconBgDistance: '#ebf4f9',
  // statIconBgWarm: icon pill bg for warm-tint distance stat tile (split view)
  statIconBgWarm: '#fef3e6',
  // statTileValue: big number text color in stat tiles (Days, Runners, Splits etc.)
  statTileValue: '#1a1f1c',
  // scrollFadeBg: gradient fade color for horizontal split pill scroll row (matches background)
  scrollFadeBg: '#f2f6eb',
  // avatarPalette: varied colors for member avatar circles
  avatarPalette: ['#568265', '#436850', '#fb6e52', '#7a847d', '#92c3a4', '#e45f45', '#2f4d39', '#a3aba6', '#d94f33', '#5a635d', '#6b9e7b', '#c2724f'],

  // ─── Layout ──────────────────────────────────────────────────────────────
  radius: '0.75rem',
};
