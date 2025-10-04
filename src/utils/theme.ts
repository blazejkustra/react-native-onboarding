import type { EdgeInsets } from 'react-native-safe-area-context';

export const defaultTheme = {
  bg: {
    primary: '#007AFF',
    secondary: '#FFFFFF',
    label: '#F2F2F7',
    accent: '#1C1C1E',
  },
  text: {
    primary: '#1C1C1E',
    secondary: '#8E8E93',
    contrast: '#FFFFFF',
  },
  fonts: {
    introTitle: 'System',
    introSubtitle: 'System',
    introButton: 'System',
    stepLabel: 'System',
    stepTitle: 'System',
    stepDescription: 'System',
    stepButton: 'System',
    primaryButton: 'System',
    secondaryButton: 'System',
  },
};

export type ThemeColors = typeof defaultTheme;
export type Theme = ThemeColors & { insets: EdgeInsets };
