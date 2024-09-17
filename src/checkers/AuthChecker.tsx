import { getUserInfo } from "apis";
import { AuthStack } from "navigation/AuthStack";
import { AuthContext } from "providers/AuthContextProvider";
import { useContext } from "react";
import SplashScreen from "react-native-splash-screen";

type Props = {
  children: React.ReactNode;
};

export const AuthChecker = ({ children }: Props) => {
  const { isValidUser } = useContext(AuthContext);

  if (!isValidUser) {
    SplashScreen.hide();
    return <AuthStack />;
  }

  return children;
};
