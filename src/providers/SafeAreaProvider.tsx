import {
  SafeAreaProvider as RNSSafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const SafeAreaProvider = ({ children }: Props) => {
  return <RNSSafeAreaProvider>{children}</RNSSafeAreaProvider>;
};
