import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  AgeAgreementScreen,
  AgreementScreen,
  MarketingAgreementScreen,
  PrivacyPolicyAgreementScreen,
  PrivacyThirdPartyAgreement,
  PrivacyTransferAgreementScreen,
  SensitiveInfoAgreementScreen,
  TermsOfUseAgreementScreen,
} from "screens/agreements";
import { LoginScreen, RegisterNicknameScreen } from "screens/auth";

const Stack = createStackNavigator();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.FadeFromBottomAndroid,
};

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="AgreementScreen" component={AgreementScreen} />
      <Stack.Screen
        name="TermsOfUseAgreementScreen"
        component={TermsOfUseAgreementScreen}
      />
      <Stack.Screen
        name="PrivacyPolicyAgreementScreen"
        component={PrivacyPolicyAgreementScreen}
      />
      <Stack.Screen
        name="SensitiveInfoAgreementScreen"
        component={SensitiveInfoAgreementScreen}
      />
      <Stack.Screen
        name="PrivacyThirdPartyAgreement"
        component={PrivacyThirdPartyAgreement}
      />
      <Stack.Screen
        name="PrivacyTransferAgreementScreen"
        component={PrivacyTransferAgreementScreen}
      />
      <Stack.Screen name="AgeAgreementScreen" component={AgeAgreementScreen} />
      <Stack.Screen
        name="MarketingAgreementScreen"
        component={MarketingAgreementScreen}
      />
      <Stack.Screen
        name="RegisterNicknameScreen"
        component={RegisterNicknameScreen}
      />
    </Stack.Navigator>
  );
};
