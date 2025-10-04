import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { type Theme } from '../../utils/theme';
import CloseIcon from '../icons/CloseIcon';

interface Props {
  onPress: () => void;
}

function SkipButton({ onPress }: Props) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <CloseIcon color={theme.text.primary} size={24} />
    </TouchableOpacity>
  );
}

export default SkipButton;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.bg.secondary,
      width: 32,
      height: 32,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
