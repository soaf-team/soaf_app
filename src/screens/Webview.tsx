import { useCallback, useRef, useState } from "react";
import {
  WebView as WebViewNative,
  WebViewNavigation,
} from "react-native-webview";
import SplashScreen from "react-native-splash-screen";

import { useWebviewBackHandler, useWebview, useDebounce } from "hooks";

import { NetworkErrorScreen } from "./fallbacks";
import { getAsyncStorage } from "utils";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/key";

type WebViewContainerProps = {
  url: string;
};

export const Webview = ({ url }: WebViewContainerProps) => {
  const webViewRef = useRef<WebViewNative>(null);

  const { getMessageFromWeb, sendMessageToWeb } = useWebview(webViewRef);
  const { setCurrentUrl } = useWebviewBackHandler(webViewRef);

  const [loadError, setLoadError] = useState(false);

  const handleLoadError = () => {
    setLoadError(true);
  };

  const debouncedHandleOnLoad = useDebounce(async (event: any) => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        getAsyncStorage(ACCESS_TOKEN),
        getAsyncStorage(REFRESH_TOKEN),
      ]);

      sendMessageToWeb({ accessToken, refreshToken });
    } catch (error) {
      console.error("error", error);
    } finally {
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
    return <NetworkErrorScreen onPress={reloadWebView} />;
  }

  return (
    <WebViewNative
      ref={webViewRef}
      originWhitelist={["*"]}
      source={{ uri: url }}
      onMessage={getMessageFromWeb}
      onLoad={debouncedHandleOnLoad}
      onError={handleLoadError}
      onNavigationStateChange={onNavigationStateChange}
      bounces={false}
      overScrollMode="never"
      injectedJavaScript={`
        (function() {
          var oldLog = console.error;
          console.error = function(...args) {
            oldLog.apply(console, args);
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'LOG', data: args}));
          };
        })();
      `}
      cacheEnabled={false}
    />
  );
};
