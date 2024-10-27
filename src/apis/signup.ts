import { OauthType } from "types/global";
import { axiosInstance } from "./axios";
import { extractTokensFromCookies, setTokenToStorage } from "utils";

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

  const cookies = response.headers["set-cookie"];
  if (!cookies) throw new Error("No cookies found in response headers");
  const { accessToken, refreshToken } = extractTokensFromCookies(cookies);
  await setTokenToStorage(accessToken!, refreshToken!);

  return response.data.data;
};
