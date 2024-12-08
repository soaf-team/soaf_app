import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";

import { MainStackParamList } from "types/navigation";
import { BottomTab } from "./BottomTab";
import { LINK } from "constants/link";

const Stack = createStackNavigator<MainStackParamList>();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.FadeFromBottomAndroid,
};

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name={LINK.main.index} component={BottomTab} />
    </Stack.Navigator>
  );
};
