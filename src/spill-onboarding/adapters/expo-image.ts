import { type Image as ExpoImageType } from 'expo-image';

let ExpoImage: typeof ExpoImageType | null = null;

try {
  const { Image } = require('expo-image');
  ExpoImage = Image;
} catch {
  // expo-image not available
}

export { ExpoImage };
