import React from "react";
import { Pressable, ViewProps } from "react-native";
import { CheckIcon, CheckInactiveIcon } from "assets";

type CheckBoxProps = {
  isChecked: boolean;
  onPress?: () => void;
} & ViewProps;

export const CheckBox = ({ isChecked, onPress, ...props }: CheckBoxProps) => {
  return (
    <Pressable onPress={onPress} {...props}>
      {isChecked ? <CheckIcon /> : <CheckInactiveIcon />}
    </Pressable>
  );
};
