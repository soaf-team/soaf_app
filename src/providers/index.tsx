import { ReactNode } from "react";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { AuthContextProvider } from "./AuthContextProvider";

type Props = {
  children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </AuthContextProvider>
  );
};
