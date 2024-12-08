import { Webview } from "components";
import { WEBVIEW_BASE_URL } from "constants/url";

export const DiaryCalendarScreen = () => {
  return <Webview url={`${WEBVIEW_BASE_URL}/diary/calendar`} />;
};
