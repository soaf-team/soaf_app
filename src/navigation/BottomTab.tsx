import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, Platform, StyleSheet, View } from "react-native";
import { LINK } from "constants/link";

import {
  DiaryCalendarScreen,
  DiaryStaticsScreen,
  SoafExploreScreen,
  ChatScreen,
  MyHomeScreen,
} from "screens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mainRoutes = [
  {
    name: LINK.DIARY_CALENDAR,
    component: DiaryCalendarScreen,
    icon: require("assets/bottom-tab/diary-calendar.png"),
    iconActive: require("assets/bottom-tab/diary-calendar-active.png"),
  },
  {
    name: LINK.DIARY_STATISTICS,
    component: DiaryStaticsScreen,
    icon: require("assets/bottom-tab/diary-stats.png"),
    iconActive: require("assets/bottom-tab/diary-stats-active.png"),
  },
  {
    name: LINK.SOAF_EXPLORE,
    component: SoafExploreScreen,
    icon: require("assets/bottom-tab/soaf-explore.png"),
    iconActive: require("assets/bottom-tab/soaf-explore-active.png"),
  },
  {
    name: LINK.CHAT,
    component: ChatScreen,
    icon: require("assets/bottom-tab/chat.png"),
    iconActive: require("assets/bottom-tab/chat-active.png"),
  },
  {
    name: LINK.MY_HOME,
    component: MyHomeScreen,
    icon: require("assets/bottom-tab/my-home.png"),
    iconActive: require("assets/bottom-tab/my-home-active.png"),
  },
];

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={LINK.DIARY_CALENDAR}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <View
          style={[
            styles.tabBar,
            {
              height: bottom + 64,
            },
          ]}
        >
          {props.state.routes.map((route, index) => {
            const isFocused = props.state.index === index;

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => props.navigation.navigate(route.name)}
                style={styles.tabBarButton}
                activeOpacity={1}
              >
                <Image
                  source={
                    isFocused
                      ? mainRoutes[index].iconActive
                      : mainRoutes[index].icon
                  }
                  style={{
                    transform: [{ scale: 0.5 }],
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    >
      {mainRoutes.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: "space-between",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 24,
      },
    }),
  },
  tabBarButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 68,
  },
});
