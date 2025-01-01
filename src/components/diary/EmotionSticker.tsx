import { EmotionKey } from "types";
import { StyleSheet, View, ViewStyle } from "react-native";
import { EMOTIONS } from "constants/emotion";

interface Props {
  emotion: EmotionKey;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

export const EmotionSticker = ({
  emotion,
  size = "lg",
  style,
  ...props
}: Props) => {
  const stickerSize = {
    sm: { width: 16, height: 16 },
    md: { width: 32, height: 32 },
    lg: { width: 42, height: 42 },
  }[size];

  return (
    <View style={[stickerSize, style]} {...props}>
      {EMOTIONS[emotion]?.icon}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
