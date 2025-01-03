import React from "react";
import { ViewStyle, DimensionValue } from "react-native";
import styled from "@emotion/native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";
import { token } from "constants/token";

interface SkeletonProps {
  width: DimensionValue;
  height: number;
  variant?: "circle" | "rect";
  style?: ViewStyle;
}

export const Skeleton = ({
  width,
  height,
  variant = "rect",
  style,
}: SkeletonProps) => {
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(Math.random() * 500, withTiming(0.7, { duration: 1000 })),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SkeletonBase
      style={[
        {
          width,
          height,
          borderRadius: variant === "circle" ? 9999 : 8,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

const SkeletonBase = styled(Animated.View)`
  background-color: ${token.colors.gray100};
  overflow: hidden;
`;
