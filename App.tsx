import { ProviderGroup } from "providers";
import { CheckerGroup } from "checkers";
import { StatusBar } from "react-native";
import { ErrorBoundary } from "components";
import { SystemErrorScreen, Webview } from "screens";
import SplashScreen from "react-native-splash-screen";
import { usePretendardFont, usePushNotification } from "hooks";
import { WEBVIEW_BASE_URL } from "constants/url";

const App = () => {
  usePushNotification();
  usePretendardFont();

  return (
    <ErrorBoundary
      renderFallback={({ error, reset }) => {
        SplashScreen.hide();
        console.error(error);
        return <SystemErrorScreen onPress={reset} />;
      }}
    >
      <ProviderGroup>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <CheckerGroup>
          <Webview url={WEBVIEW_BASE_URL} />
        </CheckerGroup>
      </ProviderGroup>
    </ErrorBoundary>
  );
};

export default App;
