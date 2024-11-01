import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Header, HeaderProps } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenLayoutProps = {
  children: React.ReactNode;
  header?: HeaderProps;
  style?: StyleProp<ViewStyle>;
};

export const ScreenLayout = ({
  children,
  header,
  style,
}: ScreenLayoutProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
    >
      {header && <Header {...header} />}
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
