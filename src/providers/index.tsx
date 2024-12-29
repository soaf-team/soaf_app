import { ReactNode } from "react";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { AuthContextProvider } from "./AuthContextProvider";
import { NavigationProvider } from "./NavigationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <NavigationProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </NavigationProvider>
  );
};
