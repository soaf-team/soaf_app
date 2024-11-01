import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { PRIVACY_THIRD_PARTY_CONTENT } from "constants/agreement/privacyThirdParty";

export const PrivacyThirdPartyAgreement = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={PRIVACY_THIRD_PARTY_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};

PrivacyThirdPartyAgreement.displayName = "PrivacyThirdPartyAgreement";
