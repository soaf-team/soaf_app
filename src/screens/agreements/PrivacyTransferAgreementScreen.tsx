import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { PRIVACY_TRANSFER_CONTENT } from "constants/agreement/privacyTransfer";

export const PrivacyTransferAgreementScreen = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={PRIVACY_TRANSFER_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};
