import { LoadingSpinner } from "components";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  isLoading: boolean;
};

export const LoadingScreen = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <LoadingSpinner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,1)",
    zIndex: 9999,
  },
});
