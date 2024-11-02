import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { token } from "constants/token";

type Props = {
  children: React.ReactNode;
  variant?: keyof typeof token.typo;
  color?: keyof typeof token.color;
  style?: StyleProp<TextStyle>;
  align?: "left" | "center" | "right";
};

export const Typo = ({
  children,
  variant = "body1",
  color = "black",
  style,
  align,
}: Props) => {
  return (
    <Text
      style={[
        {
          ...token.typo[variant],
          color: token.color[color],
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
