import React, { createContext, useContext, useMemo } from 'react';
import { defaultTheme, type Theme } from './theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  type OnboardingColors,
  type OnboardingFonts,
} from '../spill-onboarding/types';

const ThemeContext = createContext<{ theme: Theme }>({
  theme: {
    ...defaultTheme,
    insets: { top: 0, bottom: 0, left: 0, right: 0 },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
  colors?: OnboardingColors;
  fonts?: OnboardingFonts | string;
}

export default function ThemeProvider({
  children,
  colors: customColors,
  fonts: customFonts,
}: ThemeProviderProps) {
  const insets = useSafeAreaInsets();

  const theme: Theme = useMemo(() => {
    const fonts =
      typeof customFonts === 'string'
        ? {
            introTitle: customFonts,
            introSubtitle: customFonts,
            introButton: customFonts,
            stepLabel: customFonts,
            stepTitle: customFonts,
            stepDescription: customFonts,
            stepButton: customFonts,
            primaryButton: customFonts,
            secondaryButton: customFonts,
          }
        : {
            introTitle:
              customFonts?.introTitle ?? defaultTheme.fonts.introTitle,
            introSubtitle:
              customFonts?.introSubtitle ?? defaultTheme.fonts.introSubtitle,
            introButton:
              customFonts?.introButton ?? defaultTheme.fonts.introButton,
            stepLabel: customFonts?.stepLabel ?? defaultTheme.fonts.stepLabel,
            stepTitle: customFonts?.stepTitle ?? defaultTheme.fonts.stepTitle,
            stepDescription:
              customFonts?.stepDescription ??
              defaultTheme.fonts.stepDescription,
            stepButton:
              customFonts?.stepButton ?? defaultTheme.fonts.stepButton,
            primaryButton:
              customFonts?.primaryButton ?? defaultTheme.fonts.primaryButton,
            secondaryButton:
              customFonts?.secondaryButton ??
              defaultTheme.fonts.secondaryButton,
          };

    const { background, text: textColors } = customColors ?? {};
    const bg = {
      primary: background?.primary ?? defaultTheme.bg.primary,
      secondary: background?.secondary ?? defaultTheme.bg.secondary,
      label: background?.label ?? defaultTheme.bg.label,
      accent: background?.accent ?? defaultTheme.bg.accent,
    };
    const text = {
      primary: textColors?.primary ?? defaultTheme.text.primary,
      secondary: textColors?.secondary ?? defaultTheme.text.secondary,
      contrast: textColors?.contrast ?? defaultTheme.text.contrast,
    };

    return { bg, text, fonts, insets };
  }, [insets, customColors, customFonts]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
