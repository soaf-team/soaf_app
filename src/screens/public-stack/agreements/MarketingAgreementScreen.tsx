import { ScreenLayout } from "components";
import MarkdownRenderer from "components/MarkdownRenderer";
import { MARKETING_CONTENT } from "constants/agreement";

export const MarketingAgreementScreen = () => {
  return (
    <ScreenLayout
      style={{ paddingHorizontal: 0 }}
      header={{
        style: { paddingHorizontal: 18 },
      }}
    >
      <MarkdownRenderer
        content={MARKETING_CONTENT}
        style={{ paddingHorizontal: 18 }}
      />
    </ScreenLayout>
  );
};
