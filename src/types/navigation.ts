import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  LoginScreen: undefined;
  AgreementScreen: {
    accessToken: string;
    refreshToken: string;
  };
  RegisterNicknameScreen: {
    accessToken: string;
    refreshToken: string;
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
