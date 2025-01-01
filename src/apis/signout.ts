import { axiosBase } from "./axios";

export const signOut = async () => {
  const response = await axiosBase.delete("/user/delete");
  return response.data.data;
};
