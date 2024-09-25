import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/key";
import React, { createContext, useEffect, useState } from "react";
import { getAsyncStorage, removeAsyncStorage } from "utils";

type AuthContextType = {
  isValidUser: boolean;
  setIsValidUser: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isValidUser: false,
  setIsValidUser: () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isValidUser, setIsValidUser] = useState<boolean>(false);

  const logout = async () => {
    await removeAsyncStorage(ACCESS_TOKEN);
    await removeAsyncStorage(REFRESH_TOKEN);
    setIsValidUser(false);
  };

  const checkAuth = async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        getAsyncStorage(ACCESS_TOKEN),
        getAsyncStorage(REFRESH_TOKEN),
      ]);

      if (!accessToken || !refreshToken) return;

      setIsValidUser(true);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isValidUser, setIsValidUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
