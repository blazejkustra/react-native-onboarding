import { useLayoutEffect, useRef, useState } from 'react';
import type { View } from 'react-native';
import type Reanimated from 'react-native-reanimated';

export type ViewRef = React.ComponentRef<typeof Reanimated.View> &
  React.ComponentRef<typeof View>;

function useMeasureHeight() {
  const ref = useRef<ViewRef>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    ref.current?.measure?.((_, __, ___, viewHeight) => {
      setHeight(viewHeight);
    });
  });

  return { ref, height };
}

export default useMeasureHeight;
