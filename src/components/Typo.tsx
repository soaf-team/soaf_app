import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  weight?: "regular" | "medium" | "semibold" | "bold" | "black";
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  align?: "left" | "center" | "right";
} & TextProps;

export const Typo = ({
  children,
  weight = "regular",
  size = 14,
  color = "#121212",
  style,
  align,
  ...props
}: Props) => {
  return (
    <Text
      style={[
        {
          fontFamily: PRETENDARD_FONT_FAMILY[weight],
          fontSize: size,
          color: color,
          textAlign: align,
          lineHeight: size * 1.5,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const PRETENDARD_FONT_FAMILY = {
  regular: "Pretendard-Regular",
  medium: "Pretendard-Medium",
  semibold: "Pretendard-SemiBold",
  bold: "Pretendard-Bold",
  black: "Pretendard-Black",
};
