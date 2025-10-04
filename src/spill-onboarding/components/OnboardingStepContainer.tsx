import React, { useMemo, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';
import SkipButton from '../buttons/SkipButton';
import { useTheme } from '../../utils/ThemeContext';
import type { Theme } from '../../utils/theme';
import type { OnboardingStep } from '../types';

interface OnboardingStepContainerProps {
  currentStep: OnboardingStep | undefined;
  showCloseButton?: boolean;
  animationDuration: number;
  onSkip?: () => void;
  ref: React.RefObject<any>;
  renderStepContent: () => React.ReactNode;
  skipButton?: ({ onPress }: { onPress: () => void }) => ReactNode;
}

function OnboardingStepContainer({
  currentStep,
  showCloseButton,
  animationDuration,
  onSkip,
  ref,
  renderStepContent,
  skipButton,
}: OnboardingStepContainerProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!currentStep) {
    return null;
  }

  return (
    <>
      {showCloseButton && onSkip && (
        <Reanimated.View
          entering={FadeIn.duration(animationDuration)}
          exiting={FadeOut.duration(animationDuration)}
          style={styles.close}
        >
          {skipButton ? (
            skipButton({ onPress: onSkip })
          ) : (
            <SkipButton onPress={onSkip} />
          )}
        </Reanimated.View>
      )}

      <Reanimated.View
        ref={ref}
        entering={FadeInDown.duration(animationDuration)}
        exiting={FadeOutDown.duration(animationDuration)}
        style={styles.bottomPanel}
      >
        {renderStepContent()}
      </Reanimated.View>
    </>
  );
}

export default OnboardingStepContainer;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bottomPanel: {
      paddingHorizontal: 16,
      paddingBottom: 16 + theme.insets.bottom,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    close: {
      position: 'absolute',
      top: theme.insets.top + 16,
      right: 16,
    },
  });
