import { UserProfileType } from "types/global";
import { axiosInstance } from "./axios";
import { getAsyncStorage } from "utils";
import { ACCESS_TOKEN } from "constants/key";

export const getUserProfile = async (): Promise<UserProfileType | null> => {
  const accessToken = await getAsyncStorage(ACCESS_TOKEN);
  // const response = await axiosInstance.get("/user/profile");
  // return response.data;

  // return Promise.resolve({
  //   nickname: "test",
  // });

  return Promise.resolve(null);
};
