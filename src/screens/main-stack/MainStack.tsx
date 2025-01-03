import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";

import { MainStackParamList } from "types/navigation";
import { BottomTab } from "./BottomTab";
import { LINK } from "constants/link";
import { DiaryWriteScreen, MyDiaryList } from "./diary-calendar";
import { DiaryDetailScreen } from "./diary-calendar/diary-detail";

const Stack = createStackNavigator<MainStackParamList>();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.FadeFromBottomAndroid,
};

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name={LINK.main.index} component={BottomTab} />
      <Stack.Screen
        name={LINK.main.diaryCalendar.write}
        component={DiaryWriteScreen}
      />
      <Stack.Screen
        name={LINK.main.diaryCalendar.list}
        component={MyDiaryList}
      />
      <Stack.Screen
        name={LINK.main.diaryCalendar.detail}
        component={DiaryDetailScreen}
      />
    </Stack.Navigator>
  );
};
