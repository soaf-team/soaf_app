import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";

export const LoadingDots = ({
  size = 10,
  color = "white",
  duration = 1500,
}) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const createDotAnimation = (delay: number) => {
    const dotProgress = useDerivedValue(() => {
      const p = (progress.value - delay + 1) % 1;
      if (p < 0.5) {
        return p * 2;
      } else {
        return (1 - p) * 2;
      }
    });

    return useAnimatedStyle(() => {
      return {
        opacity: 0.2 + dotProgress.value * 0.7,
        transform: [{ scale: 0.7 + dotProgress.value * 0.3 }],
      };
    });
  };

  const dot1Style = createDotAnimation(0);
  const dot2Style = createDotAnimation(2 / 3);
  const dot3Style = createDotAnimation(1 / 3);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          { width: size, height: size, backgroundColor: color },
          dot3Style,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { width: size, height: size, backgroundColor: color },
          dot2Style,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { width: size, height: size, backgroundColor: color },
          dot1Style,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    borderRadius: 50,
    marginHorizontal: 3,
  },
});
