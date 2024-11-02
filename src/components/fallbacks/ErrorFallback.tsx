import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Typo } from "../ui/Typo";

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
        <Typo variant="head3" align="center">
          {title}
        </Typo>
        <Typo variant="label2" align="center" color="grey300">
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
