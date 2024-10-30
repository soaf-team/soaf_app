import { OauthType } from "types/global";
import { axiosInstance } from "./axios";

type SignupProps = {
  email: string;
  password: string;
  name: string;
  sns: OauthType;
};

export const signup = async ({ name, password, email, sns }: SignupProps) => {
  const response = await axiosInstance.post("/user/sns-signup", {
    name,
    password,
    email,
    sns,
  });
  return response.data.data;
};
