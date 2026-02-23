import type { ThemeTokens } from './types';

export const sleek: ThemeTokens = {
  // ─── Brand ───────────────────────────────────────────────────────────────
  // primary: main buttons, active states, rings, badges — Activity Ring green
  primary: '#30D158',
  // primaryDark: hover state for primary buttons
  primaryDark: '#26A846',
  // primaryDarkest: pressed / deepest brand surface
  primaryDarkest: '#1D7A34',
  // primaryForeground: text/icon on top of primary bg
  primaryForeground: '#000000',
  // accent: secondary highlight — Move Ring red
  accent: '#FF453A',
  // accentDark: hover state for accent elements
  accentDark: '#D43930',
  // accentForeground: text/icon on top of accent bg
  accentForeground: '#FFFFFF',

  // ─── Surfaces ────────────────────────────────────────────────────────────
  // background: app-level page background — OLED black
  background: '#000000',
  // card: elevated card / sheet surfaces
  card: '#1C1C1E',
  // secondary: secondary button bg, section bg tint
  secondary: '#2C2C2E',
  // secondaryForeground: text/icon on secondary bg
  secondaryForeground: '#30D158',
  // secondaryActive: pressed state for secondary buttons
  secondaryActive: '#3A3A3C',
  // muted: subtle surface for chips, tags, input wrappers
  muted: '#2C2C2E',
  // mutedForeground: text on muted surfaces (descriptions, captions)
  mutedForeground: '#8E8E93',
  // inputBackground: text input field fill
  inputBackground: '#1C1C1E',
  // surfaceHover: hover overlay on interactive cards/rows
  surfaceHover: '#2C2C2E',

  // ─── Text ────────────────────────────────────────────────────────────────
  // foreground: primary body text
  foreground: '#FFFFFF',
  // mutedText: secondary/supporting text (stat row labels, sub-labels)
  mutedText: '#8E8E93',
  // placeholder: input placeholder text
  placeholder: '#636366',
  // disabled: disabled text AND stat-tile labels (DAYS, RUNNERS, SPLITS etc.)
  disabled: '#48484A',

  // ─── Borders & Interactive ───────────────────────────────────────────────
  // border: default card/input border
  border: '#38383A',
  // borderStrong: dividers, stronger separators
  borderStrong: '#48484A',
  // switchBackground: toggle switch track (off state)
  switchBackground: '#39393D',
  // ring: focus ring on inputs and interactive elements
  ring: '#30D158',

  // ─── Status ──────────────────────────────────────────────────────────────
  // destructive: delete/error actions (buttons, text)
  destructive: '#FF453A',
  // destructiveForeground: text/icon on destructive bg
  destructiveForeground: '#FFFFFF',
  // statusSuccessBg: success badge background (e.g. "Active" badge bg)
  statusSuccessBg: 'rgba(48, 209, 88, 0.15)',
  // statusSuccessText: success badge text
  statusSuccessText: '#30D158',
  // statusWarningBg: warning badge / pending state background
  statusWarningBg: 'rgba(255, 214, 10, 0.15)',

  // ─── Charts ──────────────────────────────────────────────────────────────
  // chart1–5: Activity Ring colors
  chart1: '#30D158',
  chart2: '#FF453A',
  chart3: '#0A84FF',
  chart4: '#FFD60A',
  chart5: '#BF5AF2',

  // ─── Metric Indicators ───────────────────────────────────────────────────
  // metricDistance: distance metric text/icon color
  metricDistance: '#0A84FF',
  // metricDuration: duration/time metric text/icon color
  metricDuration: '#30D158',
  // metricPace: pace metric text/icon color
  metricPace: '#FFD60A',
  // metricComplete: completion/check metric color
  metricComplete: '#30D158',
  // leaderboardText: leaderboard rank/name text
  leaderboardText: '#FFFFFF',

  // ─── Warning / At-Risk ───────────────────────────────────────────────────
  // warning: at-risk / overdue warning text and icons (EdgeStates)
  warning: '#FF9F0A',
  // warningBg: background of warning banners/cards
  warningBg: '#1C1200',
  // warningBorder: border of warning banners/cards
  warningBorder: '#5C3B00',

  // ─── Metric-Section UI (SplitDetails) ────────────────────────────────────
  // metricIconBg: icon container bg in metric detail sections
  metricIconBg: '#2C2C2E',
  // metricSectionBgWarm: warm-tinted metric section card bg
  metricSectionBgWarm: '#0D1F12',
  // metricSectionBgCool: cool-tinted metric section card bg
  metricSectionBgCool: '#0F1A1F',
  // metricDividerGold: gold-tone divider lines in metric sections
  metricDividerGold: '#4D3600',
  // metricSectionHover: hover state for metric section rows
  metricSectionHover: '#2C2C2E',
  // metricSliderTrack: range slider track color in metric config
  metricSliderTrack: '#3A3A3C',
  // metricDividerGreen: green-tone divider lines in metric sections
  metricDividerGreen: '#0A2E14',

  // ─── Rules Section ───────────────────────────────────────────────────────
  // rulesBg: background of program rules list
  rulesBg: '#1C1C1E',
  // rulesHover: hover row bg in rules list
  rulesHover: '#2C2C2E',

  // ─── Notice / Ended-Program ──────────────────────────────────────────────
  // noticeBg: ended/expired program notice card bg
  noticeBg: '#1C1C1E',
  // noticeBorder: ended/expired program notice card border
  noticeBorder: '#38383A',
  // noticeText: body text inside notice cards
  noticeText: '#8E8E93',
  // noticeAccent: highlighted/accent text inside notice cards
  noticeAccent: '#FF453A',

  // ─── Destructive-Soft ────────────────────────────────────────────────────
  // destructiveSoft: softer red for inline delete text/icons (UserProfile)
  destructiveSoft: '#FF6961',
  // destructiveSoftBg: soft red tint bg for delete zones
  destructiveSoftBg: '#2A0F0F',

  // ─── Hover / Interaction ─────────────────────────────────────────────────
  // surfaceHoverSubtle: very subtle hover on list items / sidebar rows
  surfaceHoverSubtle: '#252527',
  // surfaceHoverWarm: neutral warm hover (profile sections)
  surfaceHoverWarm: '#2A2020',

  // ─── Unmet-State / Table ─────────────────────────────────────────────────
  // cellUnmet: background of unmet/empty table cells
  cellUnmet: '#151516',
  // borderSubtle: very light dividers inside tables
  borderSubtle: '#2C2C2E',
  // rowHighlight: highlighted row background (active member row etc.)
  rowHighlight: '#2C2C2E',

  // ─── Device Disconnection ────────────────────────────────────────────────
  // disconnectBg: background of device-disconnected warning banner
  disconnectBg: '#1F0A0A',

  // ─── Strava Badge ────────────────────────────────────────────────────────
  // stravaBg: background tint behind Strava logo/badge (subtle dark tint, not solid brand)
  stravaBg: '#1F0D00',

  // ─── Stat-Tile Icon Backgrounds ──────────────────────────────────────────
  // statIconBgPrimary: icon pill bg for primary/activity/calendar stat tiles
  statIconBgPrimary: '#0D2B18',
  // statIconBgDuration: icon pill bg for users/timer/duration stat tiles
  statIconBgDuration: '#2C2C2E',
  // statIconBgDistance: icon pill bg for route/distance/layers stat tiles
  statIconBgDistance: '#2C2C2E',
  // statIconBgWarm: icon pill bg for warm-tint distance stat tile (split view)
  statIconBgWarm: '#331A00',
  // statTileValue: big number text color in stat tiles (Days, Runners, Splits etc.)
  statTileValue: '#FFFFFF',
  // scrollFadeBg: gradient fade color for horizontal split pill scroll row (matches background)
  scrollFadeBg: '#000000',
  // avatarPalette: varied colors for member avatar circles
  avatarPalette: ['#FF453A', '#30D158', '#0A84FF', '#FFD60A', '#BF5AF2', '#FF9F0A', '#64D2FF', '#FF375F', '#30B0C7', '#FFD60A', '#32D74B', '#FF6961'],

  // ─── Layout ──────────────────────────────────────────────────────────────
  radius: '1rem',
};
