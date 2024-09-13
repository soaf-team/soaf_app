import React from "react";
import CodePushChecker from "./CodePushChecker";

type Props = {
  children: React.ReactNode;
};

export const CheckerGroup = ({ children }: Props) => {
  return <CodePushChecker>{children}</CodePushChecker>;
};
