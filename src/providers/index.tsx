import { ReactNode } from "react";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { AuthContextProvider } from "./AuthContextProvider";
import { NavigationProvider } from "./NavigationProvider";

type Props = {
  children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
  return (
    <NavigationProvider>
      <AuthContextProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </AuthContextProvider>
    </NavigationProvider>
  );
};
