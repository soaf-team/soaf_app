import { Asset } from 'react-native-image-picker';
import { signOut } from 'apis/signout';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/key';
import { AuthContext } from 'providers/AuthContextProvider';
import { RefObject, useContext } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { setAsyncStorage, openAlbum, openCamera } from 'utils';

const albumHandlers = (assets: (string | Asset)[] | undefined, data: any) => {
  const category = data.category;

  if (!assets) return;

  if (category === 'CHAT') {
    return {
      type: 'SELECTED_IMAGES',
      imageArray: assets,
      category: 'CHAT',
      roomId: data,
    };
  }

  return {
    type: 'SELECTED_IMAGES',
    imageArray: assets,
    category: 'DIARY',
  };
};

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
        const base64Camera = await openCamera();
        sendMessageToWeb({
          type: 'SELECTED_IMAGES',
          imageArray: [base64Camera],
          roomId: nativeEvent.data,
        });
        break;
      case 'OPEN_ALBUM':
        const photoList = await openAlbum(nativeEvent.data.category);
        console.log(photoList);
        sendMessageToWeb(albumHandlers(photoList, nativeEvent.data));
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
      case 'SIGN_OUT':
        Promise.all([signOut(), logout()]);
        break;
      default:
        break;
    }
  };

  return { getMessageFromWeb, sendMessageToWeb };
};
