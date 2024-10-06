import React from "react";
// import CodePushChecker from "./CodePushChecker";
import { AuthChecker } from "./AuthChecker";

type Props = {
  children: React.ReactNode;
};

export const CheckerGroup = ({ children }: Props) => {
  return (
    // <CodePushChecker>
    <AuthChecker>{children}</AuthChecker>
    // </CodePushChecker>
  );
};
