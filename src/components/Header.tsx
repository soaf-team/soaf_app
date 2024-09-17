import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

export type HeaderProps = {
  leftSlot?: React.ReactNode;
  title?: string;
  rightSlot?: React.ReactNode;
} & ViewProps;

export const Header = ({
  leftSlot,
  title,
  rightSlot,
  style,
  ...props
}: HeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <View style={[styles.container, style]} {...props}>
      {leftSlot === undefined ? (
        <TouchableOpacity onPress={goBack} activeOpacity={1}>
          <Image
            source={require("assets/images/back.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      ) : (
        leftSlot
      )}
      <View style={styles.title}>{title}</View>
      {rightSlot}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 52,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
});
