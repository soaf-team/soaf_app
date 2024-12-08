import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { TERMS_OF_USE_CONTENT } from "constants/agreement/termsOfUse";

export const TermsOfUseAgreementScreen = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={TERMS_OF_USE_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};
