import { ProviderGroup } from "providers";
import { CheckerGroup } from "checkers";
import { StatusBar } from "react-native";
import { ErrorBoundary } from "components";
import { SystemErrorFallback } from "components/fallbacks";
import SplashScreen from "react-native-splash-screen";
import { usePretendardFont, usePushNotification } from "hooks";
import { MainStack } from "screens/main-stack";

const App = () => {
  usePushNotification();
  usePretendardFont();

  return (
    <ErrorBoundary
      renderFallback={({ error, reset }) => {
        SplashScreen.hide();
        console.error(error);
        return <SystemErrorFallback onPress={reset} />;
      }}
    >
      <ProviderGroup>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <CheckerGroup>
          <MainStack />
        </CheckerGroup>
      </ProviderGroup>
    </ErrorBoundary>
  );
};

export default App;
