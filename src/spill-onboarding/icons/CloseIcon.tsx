import { View, StyleSheet } from 'react-native';

interface CloseIconProps {
  size?: number;
  color?: string;
}

export default function CloseIcon({
  size = 24,
  color = '#000',
}: CloseIconProps) {
  const lineWidth = Math.max(2, size * 0.1);
  const lineLength = size * 0.7;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* First diagonal line */}
      <View
        style={[
          styles.line,
          {
            width: lineLength,
            height: lineWidth,
            backgroundColor: color,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      {/* Second diagonal line */}
      <View
        style={[
          styles.line,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: lineLength,
            height: lineWidth,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
            position: 'absolute',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
  },
});
