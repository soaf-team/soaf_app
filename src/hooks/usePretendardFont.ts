import { useFonts } from "expo-font";

export const usePretendardFont = () => {
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Bold": require("assets/fonts/Pretendard-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
};
