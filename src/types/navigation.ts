import { StackNavigationProp } from "@react-navigation/stack";
import { OauthType } from "./global";
import type * as DiaryCalendarScreens from "../screens/diary-calendar";

type SignupParams = {
  password: string;
  email: string;
  sns: OauthType;
  token: string;
};

export type RootStackParamList = {
  [K in keyof typeof DiaryCalendarScreens]: undefined;
} & {
  MainScreen: undefined;
  LoginScreen: undefined;
  AgreementScreen: SignupParams;
  RegisterNicknameScreen: SignupParams;
  SignupCompleteScreen: {
    nickname: string;
  };
  TermsOfUseAgreementScreen: undefined;
  PrivacyPolicyAgreementScreen: undefined;
  SensitiveInfoAgreementScreen: undefined;
  PrivacyThirdPartyAgreement: undefined;
  PrivacyTransferAgreementScreen: undefined;
  AgeAgreementScreen: undefined;
  MarketingAgreementScreen: undefined;
};

export type StackNavigationType = StackNavigationProp<RootStackParamList>;
