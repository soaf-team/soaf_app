import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { LoginScreen } from "screens/LoginScreen";

type Props = {
  children: React.ReactNode;
};

export const AuthChecker = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  if (!isLoggedIn) {
    SplashScreen.hide();
    return <LoginScreen />;
  }

  return children;
};
