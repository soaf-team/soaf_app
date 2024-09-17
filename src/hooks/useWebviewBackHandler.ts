import { useCallback, useRef, useState } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";
import WebView from "react-native-webview";
import { useBackHandler } from "./useBackHandler";
import { WEBVIEW_BASE_URL } from "constants/url";

export const useWebviewBackHandler = (webViewRef: React.RefObject<WebView>) => {
  const [currentUrl, setCurrentUrl] = useState(WEBVIEW_BASE_URL);

  const exitAppRef = useRef<boolean>(false);
  const exitTimerRef = useRef<number | null>(null);

  const onBackPress = () => {
    if (!webViewRef.current) return false;

    const pathname = new URL(currentUrl).pathname;

    console.log(pathname);

    if (
      ["/diary/stats/", "/explore/", "/chat/main/", "/myHome/main"].includes(
        pathname
      )
    ) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: "navigateToMain",
        })
      );
      return true;
    }

    if (pathname === "/diary/calendar/") {
      handleExitApp();
      return true;
    }

    webViewRef.current.goBack();
    return true;
  };

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const handleExitApp = useCallback(() => {
    const currentTime = new Date().getTime();

    if (
      exitAppRef.current &&
      exitTimerRef.current &&
      currentTime - exitTimerRef.current < 2000
    ) {
      BackHandler.exitApp();
    } else {
      exitAppRef.current = true;
      exitTimerRef.current = currentTime;
      showToast("한 번 더 누르면 종료됩니다");

      setTimeout(() => {
        exitAppRef.current = false;
        exitTimerRef.current = null;
      }, 2000);
    }
  }, [showToast]);

  useBackHandler({
    onBackPress,
  });

  return {
    setCurrentUrl,
  };
};
