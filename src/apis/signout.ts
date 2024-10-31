import { axiosInstance } from "./axios";

export const signOut = async () => {
  const response = await axiosInstance.delete("/user/delete");
  return response.data.data;
};
