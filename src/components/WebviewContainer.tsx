import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useWebview } from "../hooks/useWebview";

type WebViewContainerProps = {
  url: string;
  dataToWeb?: any;
};

export const WebViewContainer = ({
  url,
  dataToWeb = {},
}: WebViewContainerProps) => {
  const webViewRef = useRef(null);
  const { requestOnMessage, sendMessageToWeb } = useWebview(webViewRef);

  const [loadError, setLoadError] = useState(false);

  const handleLoadError = () => {
    setLoadError(true);
  };

  if (loadError) {
    return (
      <View style={{ flex: 1 }}>
        <Text>웹뷰 페이지 연결 오류</Text>
      </View>
    );
  }

  return (
    <>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ uri: url }}
        onMessage={requestOnMessage}
        onLoad={() => {
          sendMessageToWeb(dataToWeb);
        }}
        onError={handleLoadError}
        onNavigationStateChange={(navState) => {
          if (!navState.loading) {
            setLoadError(false);
          }
        }}
        bounces={false}
        s
      />
    </>
  );
};
