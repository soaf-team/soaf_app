import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/key';
import { AuthContext } from 'providers/AuthContextProvider';
import { RefObject, useContext } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { setAsyncStorage, openAlbum, openCamera } from 'utils';

export const useWebview = (webViewRef: RefObject<WebView<{}>>) => {
  const { logout } = useContext(AuthContext);

  const sendMessageToWeb = (data: any) => {
    if (webViewRef.current) {
      // @ts-ignore
      webViewRef.current.postMessage(JSON.stringify(data));
    }
  };

  const getMessageFromWeb = async (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    const eventType = nativeEvent.type;

    switch (eventType) {
      case 'LOG':
        console.log('web :' + JSON.stringify(nativeEvent.data));
        break;
      case 'OPEN_CAMERA':
        await openCamera();
        break;
      case 'OPEN_ALBUM':
        const base64Array = await openAlbum();
        sendMessageToWeb({
          type: 'SELECTED_IMAGES',
          imageArray: base64Array,
          roomId: nativeEvent.data,
        });
        break;
      case 'REFRESH_TOKEN':
        const { accessToken, refreshToken } = nativeEvent.data;
        try {
          Promise.all([
            setAsyncStorage(ACCESS_TOKEN, accessToken),
            setAsyncStorage(REFRESH_TOKEN, refreshToken),
          ]);
        } catch (error) {
          console.log('error', error);
        }
        break;
      case 'LOGOUT':
        logout();
        break;
      default:
        break;
    }
  };

  return { getMessageFromWeb, sendMessageToWeb };
};
