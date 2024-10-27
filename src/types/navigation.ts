import { StackNavigationProp } from "@react-navigation/stack";
import { OauthType } from "./global";

type SignupParams = {
  password: string;
  email: string;
  sns: OauthType;
};

export type RootStackParamList = {
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
