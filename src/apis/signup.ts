import { OauthType } from "types/global";
import { axiosBase } from "./axios";

type SignupProps = {
  email: string;
  password: string;
  name: string;
  sns: OauthType;
};

export const signup = async ({ name, password, email, sns }: SignupProps) => {
  const response = await axiosBase.post("/user/sns-signup", {
    name,
    password,
    email,
    sns,
  });
  return response.data.data;
};
