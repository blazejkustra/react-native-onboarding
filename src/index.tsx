import ThemeProvider from './utils/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  type OnboardingProps,
  type OnboardingColors,
  type OnboardingFonts,
  type OnboardingIntroPanelProps,
  type OnboardingStepPanelProps,
} from './spill-onboarding/types';
import SpillOnboarding from './spill-onboarding';

function Onboarding({ colors, fonts, ...props }: OnboardingProps) {
  return (
    <SafeAreaProvider>
      <ThemeProvider colors={colors} fonts={fonts}>
        <SpillOnboarding {...props} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default Onboarding;
export type {
  OnboardingProps,
  OnboardingColors,
  OnboardingFonts,
  OnboardingIntroPanelProps,
  OnboardingStepPanelProps,
};
