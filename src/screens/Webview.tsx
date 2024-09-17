import { useCallback, useEffect, useRef, useState } from "react";
import {
  WebView as WebViewNative,
  WebViewNavigation,
} from "react-native-webview";
import SplashScreen from "react-native-splash-screen";

import { useWebviewBackHandler, useWebview } from "hooks";

import { NetworkErrorScreen } from "./fallbacks";

type WebViewContainerProps = {
  url: string;
  dataToWeb?: any;
};

export const Webview = ({ url, dataToWeb = {} }: WebViewContainerProps) => {
  const webViewRef = useRef<WebViewNative>(null);

  const { requestOnMessage, sendMessageToWeb } = useWebview(webViewRef);
  const { setCurrentUrl } = useWebviewBackHandler(webViewRef);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleLoadError = () => {
    setLoadError(true);
  };

  const handleOnLoad = (event: any) => {
    console.log("handleOnLoad", event);

    setIsLoading(false);
    sendMessageToWeb(dataToWeb);
  };

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

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  if (loadError) {
    return <NetworkErrorScreen onPress={reloadWebView} />;
  }

  return (
    <WebViewNative
      ref={webViewRef}
      originWhitelist={["*"]}
      source={{ uri: url }}
      onMessage={requestOnMessage}
      onLoad={handleOnLoad}
      onError={handleLoadError}
      onNavigationStateChange={onNavigationStateChange}
      bounces={false}
      overScrollMode="never"
    />
  );
};
