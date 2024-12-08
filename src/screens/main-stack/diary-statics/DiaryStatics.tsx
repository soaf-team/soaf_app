import { Webview } from "components";
import { WEBVIEW_BASE_URL } from "constants/url";

export const DiaryStaticsScreen = () => {
  return <Webview url={`${WEBVIEW_BASE_URL}/diary/stats`} />;
};
