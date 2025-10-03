import type { EdgeInsets } from 'react-native-safe-area-context';
import { fontFamily } from './fontStyles';

export const defaultTheme = {
  bg: {
    primary: '#3D61D6',
    secondary: '#ffffff',
    label: '#e6e7eb',
    accent: '#020f3c',
  },
  text: {
    primary: '#020f3c',
    secondary: 'rgba(2, 15, 60, 0.8)',
    contrast: '#ffffff',
  },
  fonts: {
    introTitle: fontFamily.medium,
    introSubtitle: fontFamily.medium,
    introButton: fontFamily.medium,
    stepLabel: fontFamily.medium,
    stepTitle: fontFamily.medium,
    stepDescription: fontFamily.regular,
    stepButton: fontFamily.medium,
    primaryButton: fontFamily.medium,
    secondaryButton: fontFamily.medium,
  },
};

export type ThemeColors = typeof defaultTheme;
export type Theme = ThemeColors & { insets: EdgeInsets };
