import { ReactNode } from "react";
import { SafeAreaProvider } from "./SafeAreaProvider";

type Props = {
  children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
