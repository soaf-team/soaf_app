import { useCallback, useRef, useState } from "react";
import {
  WebView as WebViewNative,
  WebViewNavigation,
} from "react-native-webview";
import SplashScreen from "react-native-splash-screen";

import {
  useWebviewBackHandler,
  useWebview,
  useDebounce,
  useKeyboardHeight,
} from "hooks";

import { getAsyncStorage } from "utils";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/key";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoadingFallback, NetworkErrorFallback } from "components/fallbacks";

type WebViewContainerProps = {
  url: string;
};

export const Webview = ({ url }: WebViewContainerProps) => {
  const webViewRef = useRef<WebViewNative>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const urlWithSafeArea = `${url}?top=${safeAreaInsets.top}&bottom=${safeAreaInsets.bottom}`;
  const { isKeyboardVisible, screenHeight } = useKeyboardHeight();

  const { getMessageFromWeb, sendMessageToWeb } = useWebview(webViewRef);
  const { currentUrl, setCurrentUrl } = useWebviewBackHandler(webViewRef);

  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadError = () => {
    setLoadError(true);
  };

  const debouncedHandleOnLoad = useDebounce(async (event: any) => {
    try {
      setIsLoading(true);
      const [accessToken, refreshToken] = await Promise.all([
        getAsyncStorage(ACCESS_TOKEN),
        getAsyncStorage(REFRESH_TOKEN),
      ]);

      sendMessageToWeb({ accessToken, refreshToken });
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
      SplashScreen.hide();
    }
  }, 500);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);

    if (!navState.loading) {
      setLoadError(false);
    }
  };

  const reloadWebView = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setLoadError(false);
  }, []);

  if (loadError) {
    SplashScreen.hide();
    return <NetworkErrorFallback onPress={reloadWebView} />;
  }

  const style =
    currentUrl.includes("diary/write/step3/") ||
    currentUrl.includes("diary/edit/") ||
    (currentUrl.includes("chat/room/") && isKeyboardVisible)
      ? { height: screenHeight }
      : { flex: 1 };

  return (
    <View style={style}>
      <WebViewNative
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ uri: urlWithSafeArea }}
        onMessage={getMessageFromWeb}
        onLoad={debouncedHandleOnLoad}
        onError={handleLoadError}
        onNavigationStateChange={onNavigationStateChange}
        bounces={false}
        overScrollMode="never"
        scalesPageToFit={false}
        injectedJavaScript={`
        (function() {
          var oldLog = console.error;
          console.error = function(...args) {
            oldLog.apply(console, args);
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'LOG', data: args}));
          };
        })();

        const meta = document.createElement('meta');
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        meta.setAttribute('name', 'viewport');
        document.getElementsByTagName('head')[0].appendChild(meta);
        true;

        const style = document.createElement('style');
        style.textContent = \`
          * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* 입력 필드는 선택 가능하게 유지 */
          input, textarea {
            -webkit-user-select: auto;
            -khtml-user-select: auto;
            -moz-user-select: auto;
            -ms-user-select: auto;
            user-select: auto;
          }
        \`;
        document.head.appendChild(style);
      `}
        cacheEnabled={false}
        // textInteractionEnabled={false}
        dataDetectorTypes="none"
        scrollEnabled={!isKeyboardVisible}
      />
      <LoadingFallback isLoading={isLoading} />
    </View>
  );
};
