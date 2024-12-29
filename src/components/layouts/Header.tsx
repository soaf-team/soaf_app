import { useNavigation } from "@react-navigation/native";
import { BackIcon } from "assets";
import { token } from "constants/token";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

export type HeaderProps = {
  children?: React.ReactNode;
  leftSlot?: {
    component?: React.ReactNode;
    style?: ViewStyle;
  } | null;
  rightSlot?: {
    component?: React.ReactNode;
    style?: ViewStyle;
  } | null;
  style?: ViewStyle;
};

export const Header = (props: HeaderProps) => {
  const { children, leftSlot, rightSlot, style } = props;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      {leftSlot === undefined ? (
        <Pressable onPress={goBack}>
          <BackIcon />
        </Pressable>
      ) : (
        <View style={[styles.leftSlot, leftSlot?.style]}>
          {leftSlot?.component}
        </View>
      )}
      {children}
      {rightSlot && (
        <View style={[styles.rightSlot, rightSlot.style]}>
          {rightSlot.component}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: token.spacing.header,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  leftSlot: {
    paddingLeft: token.spacing.side,
    flex: 1,
  },
  rightSlot: {
    paddingRight: token.spacing.side,
    flex: 1,
    alignItems: "flex-end",
  },
});
