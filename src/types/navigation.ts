import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  LoginScreen: undefined;
  AgreementScreen: undefined;
  RegisterNicknameScreen: undefined;
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
