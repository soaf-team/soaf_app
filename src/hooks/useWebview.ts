import { ACCESS_TOKEN } from "constants/key";
import { RefObject } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { getAsyncStorage } from "utils";

export const useWebview = (webViewRef: RefObject<WebView<{}>>) => {
  const sendMessageToWeb = (data: any) => {
    if (webViewRef.current) {
      // @ts-ignore
      webViewRef.current.postMessage(JSON.stringify(data));
    }
  };

  const getMessageFromWeb = async (e: WebViewMessageEvent) => {
    console.log(e.nativeEvent);
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    switch (nativeEvent.type) {
      case "ON_READY":
        const accessToken = await getAsyncStorage(ACCESS_TOKEN);
        sendMessageToWeb({ accessToken });
        console.log("sended");
        break;
    }
  };

  return { getMessageFromWeb, sendMessageToWeb };
};
