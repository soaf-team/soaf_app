import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type LoadingSpinnerProps = {
  size?: number;
  duration?: number;
};

export const LoadingSpinner = ({
  size = 50,
  duration = 1000,
}: LoadingSpinnerProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = 0;
    const rotationAnimation = withRepeat(
      withTiming(360, {
        duration: duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    rotation.value = rotationAnimation;

    return () => {
      cancelAnimation(rotation);
    };
  }, [rotation, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("assets/images/loading-spinner.png")}
        style={[{ width: size, height: size }, animatedStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
