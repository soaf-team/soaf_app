import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";

import { RootStackParamList } from "types/navigation";
import { BottomTab } from "./BottomTab";

import * as Screens from "../screens";

const Stack = createStackNavigator<RootStackParamList>();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.FadeFromBottomAndroid,
};

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name={"MainScreen"} component={BottomTab} />
      {Object.entries(Screens).map(([name, Component]) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          component={Component}
        />
      ))}
    </Stack.Navigator>
  );
};
