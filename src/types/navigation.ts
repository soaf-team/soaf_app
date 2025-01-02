import { StackNavigationProp } from "@react-navigation/stack";
import { OauthType } from "./global";
import { LINK } from "constants/link";

type SignupParams = {
  password: string;
  email: string;
  sns: OauthType;
  token: string;
};

export type PublicStackParamList = {
  [LINK.public.login]: undefined;
  [LINK.public.agreement.index]: SignupParams;
  [LINK.public.agreement.termsOfUse]: undefined;
  [LINK.public.agreement.privacyPolicy]: undefined;
  [LINK.public.agreement.sensitiveInfo]: undefined;
  [LINK.public.agreement.privacyThirdParty]: undefined;
  [LINK.public.agreement.privacyTransfer]: undefined;
  [LINK.public.agreement.age]: undefined;
  [LINK.public.agreement.marketing]: undefined;
  [LINK.public.registerNickname]: SignupParams;
  [LINK.public.signupComplete]: {
    nickname: string;
  };
};

export type MainStackParamList = {
  [LINK.main.index]: undefined;
  [LINK.main.diaryCalendar.index]: undefined;
  [LINK.main.diaryCalendar.write]: {
    date: string;
  };
  [LINK.main.diaryCalendar.list]: {
    date: string;
  };
  [LINK.main.diaryStatistics.index]: undefined;
  [LINK.main.soafExplore.index]: undefined;
  [LINK.main.chat.index]: undefined;
  [LINK.main.myHome.index]: undefined;
};

export type PublicStackNavigationType =
  StackNavigationProp<PublicStackParamList>;
export type MainStackNavigationType = StackNavigationProp<MainStackParamList>;
