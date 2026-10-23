import * as React from "react";
import * as styles from "./SkipLinks.module.css";
import { SkipLink } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../context/gatsby";
import { withPrefix } from "gatsby";

// Rendered before the notification banner, so the skip links are always the first tab stops.
export const SkipLinks: React.FC = () => {
  const { t } = useTranslation();
  const { gatsbyContext } = useGatsbyContext();

  return (
    <div role="navigation" aria-label="skip">
      {/* Only the homepage has a #filters target; rendering the link elsewhere
          would leave a skip-link pointing at nothing (WCAG 2.4.1 / axe skip-link) */}
      {/* withPrefix: the homepage is "/<repo>/" on path-prefixed deploys */}
      {gatsbyContext.location.pathname === withPrefix("/") && (
        <SkipLink href="#filters" tabIndex={0} className={styles.skipLink}>
          {t("Skip to filters")}
        </SkipLink>
      )}
      <SkipLink href="#mainContent" tabIndex={0} className={styles.skipLink}>
        {t("Skip to main content")}
      </SkipLink>
    </div>
  );
};
