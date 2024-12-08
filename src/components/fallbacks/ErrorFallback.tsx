import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { PrimaryButton, Typo } from "components";

type Props = {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
};

export const ErrorFallback = ({
  title,
  description,
  buttonTitle,
  onPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("assets/warn.png")} style={styles.image} />
        <Typo weight="bold" size={22} align="center">
          {title}
        </Typo>
        <Typo size={18} weight="medium" align="center" color="#8a91ab">
          {description}
        </Typo>
      </View>
      <View style={styles.buttonWrapper}>
        <PrimaryButton title={buttonTitle} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 52,
    height: 52,
  },
  buttonWrapper: {
    width: "100%",
    paddingBottom: 44,
  },
});
