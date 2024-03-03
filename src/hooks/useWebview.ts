import { WebViewMessageEvent } from "react-native-webview";

export const useWebview = (webViewRef: React.MutableRefObject<null>) => {
  const sendMessageToWeb = (data: any) => {
    if (webViewRef.current) {
      // @ts-ignore
      webViewRef.current.postMessage(JSON.stringify(data));
    }
  };

  const requestOnMessage = (e: WebViewMessageEvent) => {};

  return { requestOnMessage, sendMessageToWeb };
};
