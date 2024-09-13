import { RefObject } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

export const useWebview = (webViewRef: RefObject<WebView<{}>>) => {
  const sendMessageToWeb = (data: any) => {
    if (webViewRef.current) {
      // @ts-ignore
      webViewRef.current.postMessage(JSON.stringify(data));
    }
  };

  const requestOnMessage = (e: WebViewMessageEvent) => {};

  return { requestOnMessage, sendMessageToWeb };
};
