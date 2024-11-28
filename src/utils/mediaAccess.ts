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

export const openCamera = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      cameraType: 'back',
    };

    launchCamera(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        resolve(null);
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        reject(new Error(response.errorMessage));
      } else {
        if (response.assets && response.assets.length > 0) {
          try {
            const base64Image = (await processImage(
              response.assets[0],
              'CHAT'
            )) as string;
            resolve(base64Image);
          } catch (error) {
            console.error('Error processing camera image:', error);
            reject(error);
          }
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

type AssetWithThumbnail = Asset & {
  thumbnailUri: string;
};

const processImage = async (
  image: Asset,
  category: string
): Promise<string | AssetWithThumbnail> => {
  if (!image.uri) {
    console.error('Image URI is undefined');
    return '';
  }

  try {
    const fileInfo = await RNFS.stat(image.uri);
    const fileSize = fileInfo.size;

    if (fileSize <= BASE_SIZE) {
      if (category === 'DIARY') {
        return (await createThumbnail(image)) as AssetWithThumbnail;
      }
      const base64 = await RNFS.readFile(image.uri, 'base64');
      return `data:${image.type || 'image/jpeg'};base64,${base64}`;
    }

    const ratio = Math.sqrt(fileSize / COMP_SIZE);
    const width = image.width ? Math.round(image.width / ratio) : 1024;
    const height = image.height ? Math.round(image.height / ratio) : 1024;

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

    if (category === 'DIARY') {
      return (await createThumbnail({
        ...image,
        uri: resizedImage.uri,
        width: resizedImage.width,
        height: resizedImage.height,
      })) as AssetWithThumbnail;
    }

    const base64 = await RNFS.readFile(resizedImage.uri, 'base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error processing image:', error);
    return '';
  }
};

const createThumbnail = async (imageData: Asset) => {
  if (!imageData.uri) {
    console.error('Image URI is undefined');
    return '';
  }

  try {
    // 썸네일 크기로 리사이징
    const resized = await ImageResizer.createResizedImage(
      imageData.uri,
      200, // 썸네일 너비
      200, // 썸네일 높이
      'JPEG',
      80,
      0,
      undefined,
      false,
      { mode: 'contain' }
    );

    // base64로 변환
    const base64 = await RNFS.readFile(resized.uri, 'base64');
    return {
      ...imageData,
      thumbnailUri: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    return imageData;
  }
};

const openAlbumOriginal = async (category: string): Promise<Asset[] | null> => {
  return new Promise((resolve, reject) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: category === 'DIARY' ? 5 : 4,
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

export const openAlbum = async (category: string) => {
  try {
    const selectedImages = await openAlbumOriginal(category);
    if (selectedImages && selectedImages.length > 0) {
      const processedImages = await Promise.all(
        selectedImages.map((image) => processImage(image, category))
      );
      return processedImages.filter((result) => result !== '');
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
};
