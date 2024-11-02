import { OauthType } from "types/global";
import { axiosInstance } from "./axios";
import { extractTokensFromCookies } from "utils";

type LoginResultCase = "login" | "join" | "sns";

type BaseLoginResponse = {
  resultCase: LoginResultCase;
};

type JoinResponse = BaseLoginResponse & {
  resultCase: "join";
  password: string;
};

type LoginResponse = BaseLoginResponse & {
  resultCase: "login";
  access: string;
  refresh: string;
};

type DuplicatedEmailResponse = BaseLoginResponse & {
  resultCase: "sns";
  existingSns: OauthType;
};

type APIResponse = {
  data: JoinResponse | LoginResponse | DuplicatedEmailResponse;
  statusCode: number;
};

type BaseLoginResult = {
  resultCase: LoginResultCase;
};

type JoinResult = BaseLoginResult & {
  resultCase: "join";
  password: string;
};

type LoginResult = BaseLoginResult & {
  resultCase: "login";
  accessToken: string;
  refreshToken: string;
};

type SNSLoginResult = BaseLoginResult & {
  resultCase: "sns";
  existingSns: OauthType;
};

type APIResult = JoinResult | LoginResult | SNSLoginResult;

export const login = async (payload: {
  oAuthToken: string;
  email: string;
  oAuthType: OauthType;
}): Promise<APIResult> => {
  const response = await axiosInstance.post<APIResponse>("user/sns-login", {
    email: payload.email,
    token: payload.oAuthToken,
    sns: payload.oAuthType,
    name: "test",
  });

  const resultCase = response.data.data.resultCase;

  switch (resultCase) {
    case "join":
      return {
        resultCase,
        password: response.data.data.password,
      };
    case "login":
      const cookies = response.headers["set-cookie"];

      if (!cookies) throw new Error("No cookies found in response headers");

      const { accessToken, refreshToken } = extractTokensFromCookies(cookies);

      if (!accessToken || !refreshToken)
        throw new Error("No tokens found in cookies");

      return {
        resultCase,
        accessToken: response.data.data.access,
        refreshToken: response.data.data.refresh,
      };
    case "sns":
      return {
        resultCase,
        existingSns: response.data.data.existingSns,
      };
  }
};
