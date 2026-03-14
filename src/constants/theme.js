/**
 * Centralized design tokens - use these everywhere.
 * No raw hex codes outside this file.
 */

export const COLORS = {
  primary: '#6C63FF',
  primaryLight: '#E8E6FF',
  background: '#F4F5F9',
  screenBg: '#F4F4FB',
  surface: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#9B9BB4',
  dateSubLabel: '#ABABC0',
  border: '#EBEBF5',
  tabBarBorder: '#EBEBF0',
  shadowBlack: '#000',
  tagPurpleOpaque: 'rgba(108, 99, 255, 0.85)',
  headerOverlay: 'rgba(255, 255, 255, 0.15)',
  headerOverlayLight: 'rgba(255, 255, 255, 0.25)',
  searchPlaceholder: 'rgba(255, 255, 255, 0.7)',
  socialFacebook: '#1877F2',
  socialGoogle: '#EA4335',
  socialApple: '#000000',
  tagOrange: '#F5A623',
  tagPurple: '#6C63FF',
  overdue: '#FF4D4D',
  emptyIcon: '#D0CFEA',
  inputBackground: '#F0F0F7',
  inputBackgroundLight: '#EEF2FF',
  error: '#FF6B6B',
  priorityHigh: '#EF4444',
  priorityMedium: '#F59E0B',
  priorityLow: '#22C55E',
  navy: '#1A1A2E',
  sparkleOrange: '#FFB347',
  sparkleYellow: '#FFD54F',
  tagColors: [
    { bg: '#E8F5E9', text: '#2E7D32' },
    { bg: '#E3F2FD', text: '#1565C0' },
    { bg: '#FFF3E0', text: '#E65100' },
    { bg: '#F3E5F5', text: '#7B1FA2' },
    { bg: '#E0F7FA', text: '#00838F' },
    { bg: '#FCE4EC', text: '#C2185B' },
  ],
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  body: 15,
  md: 17,
  lg: 18,
  xl: 24,
  headerTitle: 26,
  xxl: 30,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  input: 12,
  lg: 16,
  pill: 20,
  xl: 24,
  full: 999,
};

export const SHADOW = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  fab: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
};
