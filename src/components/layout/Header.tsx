import { useNavigation } from "@react-navigation/native";
import { Typo } from "components/Typo";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
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
  const { goBack, canGoBack } = useNavigation();

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.slotArea}>
        {leftSlot === undefined && canGoBack() ? (
          <TouchableOpacity onPress={goBack} activeOpacity={1}>
            <Image
              source={require("assets/images/back.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        ) : (
          leftSlot
        )}
      </View>
      <Typo variant="head6b">{title}</Typo>
      <View style={styles.slotArea}>{rightSlot}</View>
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
  slotArea: {
    flexDirection: "row",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
});
