import { RefObject } from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
  ImageLibraryOptions,
  CameraOptions,
  launchCamera,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import WebView from 'react-native-webview';

export const openCamera = async (): Promise<Asset | null> => {
  return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true, // 촬영한 사진을 갤러리에 저장
      cameraType: 'back', // 후면 카메라 사용 (전면 카메라를 사용하려면 'front'로 변경)
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        resolve(null);
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        reject(new Error(response.errorMessage));
      } else {
        if (response.assets && response.assets.length > 0) {
          resolve(response.assets[0]); // 카메라는 항상 단일 이미지를 반환
        } else {
          resolve(null);
        }
      }
    });
  });
};

export const openAlbumOriginal = async (): Promise<Asset[] | null> => {
  return new Promise((resolve, reject) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 10,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        reject(new Error(response.errorMessage));
      } else {
        if (response.assets) {
          resolve(response.assets);
        } else {
          resolve(null);
        }
      }
    });
  });
};

export const openAlbum = async (webViewRef: RefObject<WebView<{}>>) => {
  try {
    const selectedImages = await openAlbumOriginal(); // 기존의 openAlbum 함수를 openAlbumOriginal로 변경
    if (selectedImages && selectedImages.length > 0) {
      const base64Array = await Promise.all(
        selectedImages.map(compressAndEncodeImage)
      );
      sendImagesToWeb(base64Array, webViewRef);
    } else {
      console.log('No images selected');
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

const compressAndEncodeImage = async (image: Asset): Promise<string> => {
  if (!image.uri) {
    console.error('Image URI is undefined');
    return '';
  }

  const base64Image = await RNFS.readFile(image.uri, 'base64');
  const imageType = image.type || 'image/jpeg';
  return `data:${imageType};base64,${base64Image}`;
};

const sendImagesToWeb = (
  base64Array: string[],
  webViewRef: RefObject<WebView<{}>>
) => {
  if (webViewRef.current) {
    webViewRef.current.postMessage(
      JSON.stringify({
        type: 'SELECTED_IMAGES',
        imageArray: base64Array,
      })
    );
  }
};
