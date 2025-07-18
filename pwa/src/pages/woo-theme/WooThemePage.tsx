import * as React from "react";
import _ from "lodash";
import { PageProps } from "gatsby";
import { WooThemeTemplate } from "../../templates/woo-theme/WooThemeTemplate";

const WooThemePage: React.FC<PageProps> = (props: PageProps) => {
  return <WooThemeTemplate />;
};
export default WooThemePage;
