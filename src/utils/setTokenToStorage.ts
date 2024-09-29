import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/key";
import { setAsyncStorage } from "./asyncStorage";

export const setTokenToStorage = async (
  accessToken: string,
  refreshToken?: string
) => {
  try {
    await Promise.all([
      setAsyncStorage(ACCESS_TOKEN, accessToken),
      refreshToken && setAsyncStorage(REFRESH_TOKEN, refreshToken),
    ]);
  } catch (error) {
    console.error(error);
  }
};
