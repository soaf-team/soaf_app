import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { SENSITIVE_INFO_CONTENT } from "constants/agreement/sensitiveInfo";

export const SensitiveInfoAgreementScreen = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={SENSITIVE_INFO_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};

SensitiveInfoAgreementScreen.displayName = "SensitiveInfoAgreementScreen";
