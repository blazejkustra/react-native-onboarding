import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { fontSizes } from '../../utils/fontStyles';
import type { Theme } from '../../utils/theme';

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton = ({
  text,
  onPress,
  icon,
  disabled = false,
  style,
  textStyle,
}: Props) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createStyles(theme, disabled),
    [theme, disabled]
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
    >
      {icon}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const createStyles = (theme: Theme, disabled: boolean) =>
  StyleSheet.create({
    button: {
      height: 48,
      width: '100%',
      borderRadius: 12,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.bg.primary,
      opacity: disabled ? 0.4 : 1,
      flexDirection: 'row',
      gap: 2,
    },
    text: {
      fontFamily: theme.fonts.primaryButton,
      fontSize: fontSizes.md,
      color: theme.text.contrast,
    },
  });
