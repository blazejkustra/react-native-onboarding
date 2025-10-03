import { Text, StyleSheet } from 'react-native';
import { ExpoImage } from '../adapters/expo-image';
import {
  ReactNativeSVG,
  ReactNativeSVGPath,
} from '../adapters/react-native-svg';

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
}

const SVG_ARROW_LEFT_STRING =
  'M10.7071 5.29289C11.0976 5.68342 11.0976 6.31658 10.7071 6.70711L6.41421 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L6.41421 13L10.7071 17.2929C11.0976 17.6834 11.0976 18.3166 10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289Z';

export default function ArrowLeftIcon({
  size = 24,
  color = '#000',
}: ArrowLeftIconProps) {
  // Use expo-image with dynamic SVG string (includes color)
  if (ExpoImage) {
    const svgString = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="${SVG_ARROW_LEFT_STRING}" fill="${color}"/>
    </svg>`;

    return (
      <ExpoImage
        source={{ uri: `data:image/svg+xml;base64,${btoa(svgString)}` }}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
    );
  }

  // Use SVG if available
  if (ReactNativeSVG && ReactNativeSVGPath) {
    return (
      <ReactNativeSVG
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <ReactNativeSVGPath d={SVG_ARROW_LEFT_STRING} fill={color} />
      </ReactNativeSVG>
    );
  }

  // Fallback to text arrow
  return (
    <Text
      style={[
        styles.arrow,
        {
          fontSize: size,
          color,
        },
      ]}
    >
      Go Back
    </Text>
  );
}

const styles = StyleSheet.create({
  arrow: {
    textAlign: 'center',
  },
});
