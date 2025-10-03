import {
  type Svg as RNSVGType,
  type Path as RNSVGPathType,
} from 'react-native-svg';

let ReactNativeSVG: typeof RNSVGType | null = null;
let ReactNativeSVGPath: typeof RNSVGPathType | null = null;

try {
  const { Svg, Path } = require('react-native-svg');
  ReactNativeSVG = Svg;
  ReactNativeSVGPath = Path;
} catch {
  // react-native-svg not available
}

export { ReactNativeSVG, ReactNativeSVGPath };
