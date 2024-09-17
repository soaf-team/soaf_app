import React from "react";
import { Animated, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Typo } from "./Typo";
import { TouchableRipple } from "react-native-paper";

type Props = {
  onPress: () => void;
  title: string;
  rippleColor?: string;
  pressedScale?: number;
  disabled?: boolean;
};

export const PrimaryButton = ({
  onPress,
  title,
  rippleColor = "rgba(0, 0, 0, 0.1)",
  pressedScale = 0.97,
  disabled = false,
}: Props) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(scaleValue, {
      toValue: pressedScale,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleValue }] }]}
    >
      <LinearGradient
        colors={disabled ? ["#E2E3E9", "#E2E3E9"] : ["#8CE3FF", "#57C2FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <TouchableRipple
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          rippleColor={rippleColor}
          style={styles.ripple}
          disabled={disabled}
        >
          <Typo size={18} weight="bold" color="white">
            {title}
          </Typo>
        </TouchableRipple>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 16,
    width: "100%",
    height: 52,
  },
  gradient: {
    width: "100%",
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  ripple: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
