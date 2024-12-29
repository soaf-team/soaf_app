import { OauthType } from "types/global";
import { axiosBase } from "./axios";
import { extractTokensFromCookies } from "utils";

type LoginResponse = {
  resultCase: LoginResultCase;
  access?: string;
  refresh?: string;
  password?: string;
};

type APIResponse = {
  data: LoginResponse;
  statusCode: number;
};
type LoginResultCase = "login" | "join" | "sns";

export const login = async (payload: {
  oAuthToken: string;
  email: string;
  oAuthType: OauthType;
}): Promise<{
  resultCase: LoginResultCase;
  accessToken?: string;
  refreshToken?: string;
  password?: string;
}> => {
  const response = await axiosBase.post<APIResponse>("user/sns-login", {
    email: payload.email,
    token: payload.oAuthToken,
    sns: payload.oAuthType,
    name: "test",
  });

  const { resultCase, password } = response.data.data;

  if (resultCase === "join") {
    return { resultCase, password };
  }

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
