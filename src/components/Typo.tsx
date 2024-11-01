import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { token } from "constants/token";

type Props = {
  children: React.ReactNode;
  variant?: keyof typeof token.typo;
  color?: string;
  style?: StyleProp<TextStyle>;
  align?: "left" | "center" | "right";
};

export const Typo = ({
  children,
  variant = "body1",
  color = "#121212",
  style,
  align,
}: Props) => {
  return (
    <Text
      style={[
        {
          ...token.typo[variant],
          color: color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
