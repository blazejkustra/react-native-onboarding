import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import type { Theme } from '../../utils/theme';

interface OnboardingModalProps {
  onSkip?: () => void;
  children: React.ReactNode;
}

export default function OnboardingModal({
  onSkip,
  children,
}: OnboardingModalProps) {
  const { theme } = useTheme();
  const { height, width } = useWindowDimensions();
  const styles = useMemo(
    () => createStyles(theme, height, width),
    [height, width, theme]
  );

  return (
    <Modal visible transparent onRequestClose={onSkip}>
      <View style={styles.webOverlay}>
        <TouchableOpacity
          style={styles.webBackdrop}
          activeOpacity={1}
          onPress={onSkip}
        />
        <View style={styles.webModal}>{children}</View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: Theme, height: number, width: number) =>
  StyleSheet.create({
    webOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    webBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    webModal: {
      width: Math.min(width, 500),
      height: Math.min(height, 800),
      borderRadius: width > 500 ? 28 : 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      overflow: 'hidden',
      backgroundColor: theme.bg.secondary,
    },
    webContent: {
      flex: 1,
      paddingTop: 16,
    },
  });
