import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { PRIVACY_POLICY_CONTENT } from "constants/agreement/privacyPolicy";

export const PrivacyPolicyAgreementScreen = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={PRIVACY_POLICY_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};

PrivacyPolicyAgreementScreen.displayName = "PrivacyPolicyAgreementScreen";
