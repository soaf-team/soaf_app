import { axiosInstance } from "./axios";

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data.data;
};
