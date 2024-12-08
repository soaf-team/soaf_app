import React from "react";
import { WEBVIEW_BASE_URL } from "constants/url";
import { Webview } from "components";

export const SoafExploreScreen = () => {
  return <Webview url={`${WEBVIEW_BASE_URL}/explore`} />;
};
