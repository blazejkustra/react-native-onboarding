import { useMemo, type ReactNode } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  type SharedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../utils/ThemeContext';
import useMeasureHeight from '../hooks/useMeasureHeight';
import type { Theme } from '../../utils/theme';
import type { OnboardingStep } from '../types';

interface OnboardingImageContainerProps {
  currentStep: OnboardingStep | undefined;
  currentStepImage: ImageSourcePropType | undefined;
  position: 'top' | 'bottom';
  animationDuration: number;
  backgroundSpillProgress: SharedValue<number>;
  introPanel: any;
  stepPanel: any;
  screenHeight: number;
  background?: () => ReactNode;
}

function OnboardingImageContainer({
  currentStep,
  currentStepImage,
  position,
  animationDuration,
  backgroundSpillProgress,
  introPanel,
  stepPanel,
  screenHeight,
  background,
}: OnboardingImageContainerProps) {
  const { theme } = useTheme();
  const image = useMeasureHeight();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const extraPadding = Platform.OS === 'web' ? 16 : 0;
  const { width: screenWidth } = useWindowDimensions();

  // bottom panel height (intro or step)
  const bottomPanelHeight = (currentStep ? stepPanel : introPanel).height || 0;

  /**
   * When 0 -> no spill; when 1 -> fully spilled by bottomPanelHeight
   */
  const backgroundSpillDistance = useDerivedValue(() =>
    interpolate(backgroundSpillProgress.value, [0, 1], [0, bottomPanelHeight])
  );

  const imageWrapperHeight = useDerivedValue(
    () => screenHeight - bottomPanelHeight + backgroundSpillDistance.value
  );

  const imageWrapperAnimation = useAnimatedStyle(() => ({
    height: imageWrapperHeight.value,
  }));

  const imageTargetY = useDerivedValue(() => {
    const topSafe = theme.insets.top + extraPadding + 16;

    if (position === 'top') {
      return topSafe;
    }

    const imageH = image.height || 0;
    const modalTop = screenHeight - bottomPanelHeight - 16;
    const yBottom = modalTop - imageH;

    const shouldClampTop = !currentStep;
    return shouldClampTop ? Math.max(yBottom, topSafe) : yBottom;
  });

  const hasMounted = useSharedValue(false);

  const imageAnimation = useAnimatedStyle(() => {
    const translateY = withTiming(
      imageTargetY.value,
      {
        duration: hasMounted.value ? animationDuration : 0,
        easing: Easing.out(Easing.cubic),
      },
      () => (hasMounted.value = true)
    );
    const sideEdges = Math.max(32 + 24 - backgroundSpillDistance.value, 0);

    return {
      transform: [{ translateY }],
      maxWidth: screenWidth - sideEdges,
    };
  }, [animationDuration]);

  const backgroundAnimation = useAnimatedStyle(() => {
    const topEdge = Math.max(
      theme.insets.top + extraPadding - backgroundSpillDistance.value,
      0
    );
    const sideEdge = Math.max(16 - backgroundSpillDistance.value, 0);

    return {
      position: 'absolute',
      top: topEdge,
      left: sideEdge,
      right: sideEdge,
      bottom: screenHeight - imageWrapperHeight.value,
      borderRadius: Math.max(12 - backgroundSpillDistance.value, 0),
    };
  });

  return (
    <>
      {background ? (
        <Animated.View style={backgroundAnimation}>
          {background()}
        </Animated.View>
      ) : (
        <Animated.View style={[styles.colorBg, backgroundAnimation]} />
      )}

      {currentStepImage && (
        <Animated.View style={[styles.imageWrapper, imageWrapperAnimation]}>
          <Animated.View style={[styles.image, imageAnimation]} ref={image.ref}>
            <Image
              source={currentStepImage}
              resizeMode="contain"
              fadeDuration={0}
            />
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}

export default OnboardingImageContainer;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    colorBg: {
      backgroundColor: theme.bg.primary,
      overflow: 'hidden',
    },
    imageWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
    },
    image: {
      alignSelf: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  });
