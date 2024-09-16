import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { TouchableRipple, TouchableRippleProps } from "react-native-paper";

type RippleButtonProps = {
  children: React.ReactNode;
  style: any;
  onPress: () => void;
  rippleColor?: string;
  pressedScale?: number;
} & TouchableRippleProps;

export const RippleButton = ({
  children,
  style,
  onPress,
  rippleColor = "rgba(0, 0, 0, 0.12)",
  pressedScale = 0.97,
  ...props
}: RippleButtonProps) => {
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
      style={[styles.container, { transform: [{ scale: scaleValue }] }, style]}
    >
      <TouchableRipple
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        rippleColor={rippleColor}
        style={styles.ripple}
        {...props}
      >
        <View style={styles.childrenContainer}>{children}</View>
      </TouchableRipple>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  ripple: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  childrenContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
