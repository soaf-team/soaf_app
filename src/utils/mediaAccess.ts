import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
  ImageLibraryOptions,
  CameraOptions,
  launchCamera,
} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';

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

// 사진 관련
const BASE_SIZE = 1024000; // 1MB (썸네일 작업 유무 기준 사이즈)
const COMP_SIZE = 512000; // 500KB (썸네일 작업 결과물 목표 사이즈)

const resizeAndCompressImage = async (image: Asset): Promise<string> => {
  if (!image.uri) {
    console.error('Image URI is undefined');
    return '';
  }

  try {
    // 파일 크기 확인
    const fileInfo = await RNFS.stat(image.uri);
    const fileSize = fileInfo.size;

    if (fileSize <= BASE_SIZE) {
      // 기준 크기 이하면 원본 반환
      const base64 = await RNFS.readFile(image.uri, 'base64');
      return `data:${image.type || 'image/jpeg'};base64,${base64}`;
    }

    // 리사이징 비율 계산
    const ratio = Math.sqrt(fileSize / COMP_SIZE);
    const width = image.width ? Math.round(image.width / ratio) : 1024;
    const height = image.height ? Math.round(image.height / ratio) : 1024;

    // 이미지 리사이징
    const resizedImage = await ImageResizer.createResizedImage(
      image.uri,
      width,
      height,
      'JPEG',
      90,
      0,
      undefined,
      false,
      { mode: 'contain', onlyScaleDown: true }
    );

    // 리사이즈된 이미지를 base64로 변환
    const base64 = await RNFS.readFile(resizedImage.uri, 'base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error resizing image:', error);
    return '';
  }
};

const openAlbumOriginal = async (): Promise<Asset[] | null> => {
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

export const openAlbum = async () => {
  try {
    const selectedImages = await openAlbumOriginal();
    if (selectedImages && selectedImages.length > 0) {
      const base64Array = await Promise.all(
        selectedImages.map(resizeAndCompressImage)
      );
      return base64Array.filter((base64) => base64 !== ''); // 빈 문자열 제거
    } else {
      console.log('No images selected');
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
};
