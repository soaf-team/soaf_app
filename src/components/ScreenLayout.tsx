import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Header, HeaderProps } from "./layouts";

type ScreenLayoutProps = {
  children: React.ReactNode;
  header?: HeaderProps | null;
  style?: StyleProp<ViewStyle>;
};

export const ScreenLayout = ({
  children,
  header,
  style,
}: ScreenLayoutProps) => {
  return (
    <View style={[styles.container, style]}>
      {header === null ? null : <Header {...header} />}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
  },
});
