import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import React, { createRef, useState } from "react";

export const navigationRef = createRef<NavigationContainerRef<any>>();

type NavigationProviderProps = {
  children: React.ReactNode;
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [navigationOnReady, setNavigationOnReady] = useState(false);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setTimeout(() => setNavigationOnReady(true), 200)}
    >
      {children}
    </NavigationContainer>
  );
};
