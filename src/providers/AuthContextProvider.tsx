import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/key";
import React, { createContext, useEffect, useState } from "react";
import { getAsyncStorage, removeAsyncStorage } from "utils";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logout = async () => {
    await removeAsyncStorage(ACCESS_TOKEN);
    await removeAsyncStorage(REFRESH_TOKEN);
    setAccessToken(null);
  };

  const checkAuth = async () => {
    const accessToken = await getAsyncStorage(ACCESS_TOKEN);
    setAccessToken(accessToken);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
