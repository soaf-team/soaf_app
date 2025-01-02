import { EmotionKey } from "types";
import { View, ViewStyle } from "react-native";
import * as EmotionIcons from "assets/emotion";

type SizeType = "sm" | "md" | "lg";

interface Props {
  emotion: EmotionKey;
  size?: SizeType;
  style?: ViewStyle;
}

const STICKER_SIZES: Record<SizeType, { width: number; height: number }> = {
  sm: { width: 16, height: 16 },
  md: { width: 32, height: 32 },
  lg: { width: 42, height: 42 },
};

const EMOTION_MAPPING: Record<EmotionKey, keyof typeof EmotionIcons> = {
  happy: "Happy",
  good: "Pleased",
  joyful: "Funny",
  excited: "Flutter",
  proud: "Proud",
  calm: "Comfortable",
  tired: "Tired",
  lonely: "Lonely",
  sad: "Sad",
  down: "Gloomy",
  worried: "Anxious",
  angry: "Angry",
};

export const EmotionSticker = ({
  emotion,
  size = "lg",
  style,
  ...props
}: Props) => {
  const { width, height } = STICKER_SIZES[size];
  const EmotionIcon = EmotionIcons[EMOTION_MAPPING[emotion]];

  return (
    <View style={[{ width, height }, style]} {...props}>
      <EmotionIcon width={width} height={height} />
    </View>
  );
};
