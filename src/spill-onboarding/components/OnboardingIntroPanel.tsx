import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import type { Theme } from '../../utils/theme';
import PrimaryButton from '../buttons/PrimaryButton';
import { fontSizes, lineHeights } from '../../utils/fontStyles';
import type { OnboardingIntroPanelProps } from '../types';

function OnboardingIntroPanel({
  onPressStart,
  title,
  subtitle,
  button,
  image,
}: OnboardingIntroPanelProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderTitle = () => {
    if (!title) {
      return undefined;
    }

    if (typeof title === 'string') {
      return (
        <Text style={[styles.text, styles.line1, styles.titleText]}>
          {title}
        </Text>
      );
    }

    return title;
  };

  const renderSubtitle = () => {
    if (!subtitle) {
      return undefined;
    }

    if (typeof subtitle === 'string') {
      return (
        <Text style={[styles.text, styles.line2, styles.subtitleText]}>
          {subtitle}
        </Text>
      );
    }

    return subtitle;
  };

  const renderButton = () => {
    if (typeof button === 'string') {
      return <PrimaryButton text={button} onPress={onPressStart} />;
    }

    return button({ onPressStart });
  };

  return (
    <View style={styles.container}>
      {typeof image === 'function'
        ? image()
        : image && <Image source={image} style={styles.image} />}
      <View style={styles.textContainer}>
        {renderTitle()}
        {renderSubtitle()}
      </View>
      {renderButton()}
    </View>
  );
}

export default OnboardingIntroPanel;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
    },
    image: {
      alignSelf: 'center',
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 48,
    },
    text: {
      fontSize: fontSizes.xxl,
      lineHeight: lineHeights.xxl,
      textAlign: 'center',
    },
    line1: {
      marginTop: 20,
      color: theme.text.primary,
    },
    line2: {
      color: theme.bg.primary,
    },
    titleText: {
      fontFamily: theme.fonts.introTitle,
    },
    subtitleText: {
      fontFamily: theme.fonts.introSubtitle,
    },
  });
