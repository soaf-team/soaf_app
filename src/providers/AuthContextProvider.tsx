import { STORAGE_KEYS } from "constants/key";
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
    await removeAsyncStorage(STORAGE_KEYS.ACCESS_TOKEN);
    await removeAsyncStorage(STORAGE_KEYS.REFRESH_TOKEN);
    setIsValidUser(false);
  };

  const checkAuth = async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        getAsyncStorage(STORAGE_KEYS.ACCESS_TOKEN),
        getAsyncStorage(STORAGE_KEYS.REFRESH_TOKEN),
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
