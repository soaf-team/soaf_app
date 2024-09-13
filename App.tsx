import { ProviderGroup } from "providers";
import { NavigationContainer } from "@react-navigation/native";
import { CheckerGroup } from "checkers";
import { StatusBar } from "react-native";
import { Webview } from "screens/Webview";
import { useFonts } from "expo-font";
import { WEBVIEW_BASE_URL } from "constants/url";
import { ErrorBoundary } from "components";
import { SystemErrorScreen } from "screens";
import SplashScreen from "react-native-splash-screen";

const App = () => {
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
            <Webview url={WEBVIEW_BASE_URL} />
          </CheckerGroup>
        </ProviderGroup>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
