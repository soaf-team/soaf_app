import { ProviderGroup } from "providers";
import { CheckerGroup } from "checkers";
import { StatusBar } from "react-native";
import { ErrorBoundary, SystemErrorFallback } from "components";
import SplashScreen from "react-native-splash-screen";
import { usePretendardFont, usePushNotification } from "hooks";
import { MainStack } from "navigation/MainStack";

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
