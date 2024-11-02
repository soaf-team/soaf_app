import { STORAGE_KEYS } from "constants/key";
import { getAsyncStorage, setAsyncStorage } from "./asyncStorage";

export const setTokenToStorage = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    await Promise.all([
      setAsyncStorage(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
      setAsyncStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const getTokenFromStorage = async () => {
  return await Promise.all([
    getAsyncStorage(STORAGE_KEYS.ACCESS_TOKEN),
    getAsyncStorage(STORAGE_KEYS.REFRESH_TOKEN),
  ]);
};
