import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { LINK } from "constants/link";
import {
  AgeAgreementScreen,
  AgreementScreen,
  MarketingAgreementScreen,
  PrivacyPolicyAgreementScreen,
  PrivacyThirdPartyAgreement,
  PrivacyTransferAgreementScreen,
  SensitiveInfoAgreementScreen,
  TermsOfUseAgreementScreen,
} from "screens/public-stack/agreements";
import {
  LoginScreen,
  RegisterNicknameScreen,
  SignupCompleteScreen,
} from "screens/public-stack/auth";
import { PublicStackParamList } from "types/navigation";

const Stack = createStackNavigator<PublicStackParamList>();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.FadeFromBottomAndroid,
};

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name={LINK.public.login} component={LoginScreen} />
      <Stack.Screen
        name={LINK.public.agreement.index}
        component={AgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.agreement.termsOfUse}
        component={TermsOfUseAgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.agreement.privacyPolicy}
        component={PrivacyPolicyAgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.agreement.sensitiveInfo}
        component={SensitiveInfoAgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.agreement.privacyThirdParty}
        component={PrivacyThirdPartyAgreement}
      />
      <Stack.Screen
        name={LINK.public.agreement.privacyTransfer}
        component={PrivacyTransferAgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.agreement.age}
        component={AgeAgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.agreement.marketing}
        component={MarketingAgreementScreen}
      />
      <Stack.Screen
        name={LINK.public.registerNickname}
        component={RegisterNicknameScreen}
      />
      <Stack.Screen
        name={LINK.public.signupComplete}
        component={SignupCompleteScreen}
      />
    </Stack.Navigator>
  );
};
