import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

type PressEffectProps = {
  scale?: number;
  duration?: number;
};

export const usePressEffect = ({
  scale = 0.97,
  duration = 200,
}: PressEffectProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: scale,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [scale, duration, scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [duration, scaleAnim]);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return {
    handlePressIn,
    handlePressOut,
    animatedStyle,
  };
};
