import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { type Theme } from '../../utils/theme';
import { fontSizes, lineHeights } from '../../utils/fontStyles';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import type { OnboardingStepPanelProps } from '../types';

function OnboardingStepPanel({
  label,
  title,
  description,
  buttonLabel,
  onBackPress,
  onNextPress,
  buttonPrimary,
  showBackButton = true,
}: OnboardingStepPanelProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {label && (
          <View style={styles.labelBadge}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.buttonRow}>
        {onBackPress && showBackButton && (
          <View style={styles.backButton}>
            <SecondaryButton
              text=""
              onPress={onBackPress}
              icon={<ArrowLeftIcon color={theme.text.primary} />}
            />
          </View>
        )}
        <View style={styles.nextButton}>
          {buttonPrimary ? (
            <PrimaryButton text={buttonLabel} onPress={onNextPress} />
          ) : (
            <SecondaryButton
              text={buttonLabel}
              onPress={onNextPress}
              textStyle={styles.nextButtonText}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default OnboardingStepPanel;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.bg.secondary,
      padding: 16,
      borderRadius: 18,
      gap: 24,
    },
    textContainer: {
      alignItems: 'center',
      gap: 16,
    },
    labelBadge: {
      backgroundColor: theme.bg.label,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },
    labelText: {
      fontFamily: theme.fonts.stepLabel,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      textAlign: 'center',
      color: theme.text.primary,
    },
    title: {
      fontFamily: theme.fonts.stepTitle,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      textAlign: 'center',
      color: theme.text.primary,
    },
    description: {
      fontFamily: theme.fonts.stepDescription,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.md,
      textAlign: 'center',
      color: theme.text.secondary,
    },

    buttonRow: {
      flexDirection: 'row',
      gap: 8,
    },
    backButton: {
      width: 48,
    },
    nextButton: {
      flex: 1,
    },
    nextButtonText: {
      fontFamily: theme.fonts.stepButton,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.md,
    },
  });
