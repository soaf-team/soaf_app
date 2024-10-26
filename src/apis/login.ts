import { OauthType } from "types/global";
import { axiosInstance } from "./axios";
import { extractTokensFromCookies } from "utils";

type LoginResponse = {
  data: {
    resultCase: LoginResultCase;
    access: string;
    refresh: string;
  };
  statusCode: number;
};
type LoginResultCase = "login" | "join" | "sns";

export const login = async (payload: {
  oAuthToken: string;
  email: string;
  oAuthType: OauthType;
}): Promise<{
  resultCase: LoginResultCase;
  accessToken: string;
  refreshToken: string;
}> => {
  const response = await axiosInstance.post<LoginResponse>("user/sns-login", {
    email: payload.email,
    token: payload.oAuthToken,
    sns: payload.oAuthType,
    name: "test",
  });

  const { resultCase } = response.data.data;

  const cookies = response.headers["set-cookie"];

  if (!cookies) throw new Error("No cookies found in response headers");

  const { accessToken, refreshToken } = extractTokensFromCookies(cookies);

  if (!accessToken || !refreshToken)
    throw new Error("No tokens found in cookies");

  return {
    resultCase,
    accessToken,
    refreshToken,
  };
};
