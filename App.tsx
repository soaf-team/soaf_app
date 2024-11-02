import { ProviderGroup } from "providers";
import { CheckerGroup } from "checkers";
import { StatusBar } from "react-native";
import { ErrorBoundary } from "components/ErrorBoundary";
import { SystemErrorFallback } from "components/fallbacks/SystemErrorFallback";
import { Webview } from "components/Webview";
import SplashScreen from "react-native-splash-screen";
import { usePretendardFont, usePushNotification } from "hooks";

const App = () => {
  const { currentUrl } = usePushNotification();
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
          <Webview url={currentUrl} />
        </CheckerGroup>
      </ProviderGroup>
    </ErrorBoundary>
  );
};

export default App;
