import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  weight?: "regular" | "medium" | "bold" | "semibold";
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  align?: "left" | "center" | "right";
};

export const Typo = ({
  children,
  weight = "regular",
  size = 14,
  color = "#121212",
  style,
  align,
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
    >
      {children}
    </Text>
  );
};

const PRETENDARD_FONT_FAMILY = {
  regular: "Pretendard-Regular",
  medium: "Pretendard-Medium",
  bold: "Pretendard-Bold",
  semibold: "Pretendard-SemiBold",
};
