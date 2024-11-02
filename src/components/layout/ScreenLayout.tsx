import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Header, HeaderProps } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { token } from "constants/token";

type ScreenLayoutProps = {
  children: React.ReactNode;
  header?: HeaderProps | null;
  style?: StyleProp<ViewStyle>;
  isNoSidePadding?: boolean;
};

export const ScreenLayout = ({
  children,
  header,
  style,
  isNoSidePadding,
}: ScreenLayoutProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: isNoSidePadding ? 0 : token.spacing.side,
        },
        style,
      ]}
    >
      {header === null ? null : <Header {...header} />}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
});
