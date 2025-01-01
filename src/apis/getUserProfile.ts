import { axiosBase } from "./axios";

export const getUserProfile = async () => {
  const response = await axiosBase.get("/user/profile");
  return response.data.data;
};
