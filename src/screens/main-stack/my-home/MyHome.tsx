import { Webview } from "components";
import { WEBVIEW_BASE_URL } from "constants/url";

export const MyHomeScreen = () => {
  return <Webview url={`${WEBVIEW_BASE_URL}/myHome/main/`} />;
};