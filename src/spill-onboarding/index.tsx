import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  type ImageSourcePropType,
  View,
  BackHandler,
  Platform,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import OnboardingIntroPanel from './components/OnboardingIntroPanel';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import OnboardingStepPanel from './components/OnboardingStepPanel';
import OnboardingStepContainer from './components/OnboardingStepContainer';
import OnboardingImageContainer from './components/OnboardingImageContainer';
import OnboardingModal from './components/OnboardingModal';
import { type OnboardingProps } from './types';
import { useWindowDimensions } from 'react-native';
import useMeasureHeight from './hooks/useMeasureHeight';
import { type Theme } from '../utils/theme';

function SpillOnboarding({
  animationDuration = 500,
  introPanel: introPanelProps,
  steps,
  onComplete,
  onSkip,
  onStepChange: onStepChangeProps,
  showCloseButton,
  showBackButton,
  background,
  closeButton,
}: OnboardingProps) {
  const { theme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const backgroundSpillProgress = useSharedValue(0);

  const [step, setStep] = useState(-1);
  const currentStep = step >= 0 ? steps[step] : undefined;
  const firstStep = steps[0];

  const onStepChange = useCallback(
    (stepNumber: number) => {
      setStep(stepNumber);
      onStepChangeProps(stepNumber);
    },
    [onStepChangeProps]
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (step > 0) {
          onStepChange(step - 1);
          return true;
        } else if (step === 0) {
          backgroundSpillProgress.set(
            withTiming(0, {
              duration: animationDuration,
            })
          );
          setTimeout(() => setStep(-1), animationDuration / 2);
          onStepChange(-1);
          return true;
        }

        // stepNumber === -1 (intro panel) - allow default back action
        return false;
      }
    );

    return () => backHandler.remove();
  }, [step, backgroundSpillProgress, onStepChange, animationDuration]);

  const introPanel = useMeasureHeight();
  const stepPanel = useMeasureHeight();
  const screen = useMeasureHeight();

  const onPressStart = () => {
    backgroundSpillProgress.set(
      withTiming(1, {
        duration: animationDuration,
      })
    );
    onStepChange(0);
  };

  const onNextPress = () => {
    if (step === steps.length - 1) {
      return onComplete();
    }

    onStepChange(step + 1);
  };

  const onBackPress = () => {
    if (step === 0) {
      backgroundSpillProgress.set(
        withTiming(0, {
          duration: animationDuration,
        })
      );

      onStepChange(-1);
      return;
    }

    onStepChange(step - 1);
  };

  const renderIntroPanel = () => {
    if (typeof introPanelProps === 'function') {
      return introPanelProps({ onPressStart });
    }

    return (
      <OnboardingIntroPanel
        onPressStart={onPressStart}
        title={introPanelProps.title}
        subtitle={introPanelProps.subtitle}
        button={introPanelProps.button}
        image={introPanelProps.image}
      />
    );
  };

  const renderStepContent = () => {
    if (!currentStep) {
      return null;
    }
    if (typeof currentStep.component === 'function') {
      return currentStep.component({
        onNext: onNextPress,
        onBack: onBackPress,
        isLast: step === steps.length - 1,
      });
    }

    return (
      <OnboardingStepPanel
        label={currentStep.label}
        title={currentStep.title}
        description={currentStep.description}
        buttonLabel={currentStep.buttonLabel}
        onBackPress={onBackPress}
        onNextPress={onNextPress}
        buttonPrimary={step === steps.length - 1}
        showBackButton={showBackButton}
      />
    );
  };

  const currentStepImage: ImageSourcePropType | undefined = useMemo(() => {
    if (!currentStep) {
      return firstStep?.image;
    }

    return currentStep.image;
  }, [currentStep, firstStep?.image]);

  const onboardingContent = (
    <View style={styles.container} ref={screen.ref}>
      <View ref={introPanel.ref} style={styles.bottomPanel}>
        {renderIntroPanel()}
      </View>

      <OnboardingImageContainer
        currentStep={currentStep}
        currentStepImage={currentStepImage}
        position={currentStep?.position ?? firstStep?.position ?? 'top'}
        animationDuration={animationDuration}
        backgroundSpillProgress={backgroundSpillProgress}
        screenHeight={screen.height}
        introPanel={introPanel}
        stepPanel={stepPanel}
        background={background}
      />

      <OnboardingStepContainer
        currentStep={currentStep}
        animationDuration={animationDuration}
        showCloseButton={showCloseButton}
        renderStepContent={renderStepContent}
        onSkip={onSkip}
        ref={stepPanel.ref}
        closeButton={closeButton}
      />
    </View>
  );

  // On web, wrap in modal; on mobile, render directly
  if (Platform.OS === 'web' && screenWidth >= 600) {
    return (
      <OnboardingModal onSkip={onSkip}>{onboardingContent}</OnboardingModal>
    );
  }

  return onboardingContent;
}

export default SpillOnboarding;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg.secondary,
    },
    bottomPanel: {
      paddingHorizontal: 16,
      paddingBottom: 16 + theme.insets.bottom,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
