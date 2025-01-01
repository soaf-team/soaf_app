import React from "react";
import { View, ScrollView, StyleSheet, ViewStyle, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header, HeaderProps } from "./Header";
import { token } from "constants/token";

type PageLayoutProps = {
  children: React.ReactNode;
  header?: HeaderProps;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  isScrollable?: boolean;
};

export const PageLayout = ({
  children,
  header,
  style,
  containerStyle,
  isScrollable,
}: PageLayoutProps) => {
  return (
    <SafeAreaView style={[styles.safeArea, containerStyle]} edges={["top"]}>
      <View style={[styles.container]}>
        {header ? (
          <Header
            leftSlot={header.leftSlot}
            rightSlot={header.rightSlot}
            style={header.style}
          >
            {header.children}
          </Header>
        ) : null}
        {isScrollable ? (
          <ScrollView
            style={[styles.content, style]}
            contentContainerStyle={styles.scrollContent}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.content, style]}>{children}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: token.spacing.header,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: token.spacing.side,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
