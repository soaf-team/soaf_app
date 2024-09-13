import React from "react";
import { Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Typo } from "./Typo";

type Props = {
  onPress: () => void;
  title: string;
};

export const Button = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#8CE3FF", "#57C2FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: 52,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typo weight="bold" size={18} color="#fff">
          {title}
        </Typo>
      </LinearGradient>
    </TouchableOpacity>
  );
};
