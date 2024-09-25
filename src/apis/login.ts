import { OauthType } from "types/global";
import { axiosInstance } from "./axios";
import { extractTokensFromCookies } from "utils";

export const login = async (payload: {
  oAuthToken: string;
  email: string;
  oAuthType: OauthType;
}) => {
  const response = await axiosInstance.post("user/sns-login", {
    email: payload.email,
    token: payload.oAuthToken,
    sns: payload.oAuthType,
    name: "test",
  });

  const cookies = response.headers["set-cookie"];

  if (!cookies) throw new Error("No cookies found in response headers");

  const { accessToken, refreshToken } = extractTokensFromCookies(cookies);

  if (!accessToken || !refreshToken)
    throw new Error("No tokens found in cookies");

  const isFirstLogin = true;

  return {
    isFirstLogin,
    accessToken,
    refreshToken,
  };
};
