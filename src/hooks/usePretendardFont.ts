import { useFonts } from "expo-font";

export const usePretendardFont = () => {
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Bold": require("assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-Black": require("assets/fonts/Pretendard-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
};
