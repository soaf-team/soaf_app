import { ProviderGroup } from "providers";
import { NavigationContainer } from "@react-navigation/native";
import { CheckerGroup } from "checkers";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { Button, ErrorBoundary } from "components";
import { SystemErrorScreen } from "screens";
import SplashScreen from "react-native-splash-screen";
import { usePushNotification } from "hooks";

import { useContext, useEffect } from "react";
import { AuthContext } from "providers/AuthContextProvider";

const App = () => {
  usePushNotification();
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary
      renderFallback={({ error, reset }) => {
        SplashScreen.hide();
        console.log(error);
        return <SystemErrorScreen onPress={reset} />;
      }}
    >
      <NavigationContainer>
        <ProviderGroup>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <CheckerGroup>
            <Logout />
            {/* <Webview url={WEBVIEW_BASE_URL} /> */}
          </CheckerGroup>
        </ProviderGroup>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Button onPress={logout} title="로그아웃" />;
};
