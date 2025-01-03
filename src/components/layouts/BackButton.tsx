import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowIcon } from "assets";

type BackButtonProps = {
  onPress?: () => void;
};

export const BackButton = ({ onPress }: BackButtonProps) => {
  const navigation = useNavigation();

  return <ArrowIcon onPress={onPress ? onPress : () => navigation.goBack()} />;
};
