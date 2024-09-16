import { AuthContext } from "providers/AuthContextProvider";
import { useContext } from "react";
import SplashScreen from "react-native-splash-screen";
import { LoginScreen } from "screens/LoginScreen";

type Props = {
  children: React.ReactNode;
};

export const AuthChecker = ({ children }: Props) => {
  const { accessToken } = useContext(AuthContext);

  console.log("accessToken", accessToken);

  if (!accessToken) {
    SplashScreen.hide();
    return <LoginScreen />;
  }

  return children;
};
