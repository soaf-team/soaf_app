import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { AGE_CONTENT } from "constants/agreement/age";
import React from "react";

export const AgeAgreementScreen = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={AGE_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};
