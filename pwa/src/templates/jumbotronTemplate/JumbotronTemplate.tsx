import * as React from "react";
import * as styles from "./JumbotronTemplate.module.css";
import clsx from "clsx";
import { Heading1, Paragraph, Page, PageContent } from "@utrecht/component-library-react/dist/css-module";
import { CardWrapper } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { processMenuTemplate } from "../../services/menuUtils";

export const JumbotronTemplate: React.FC = () => {
  const { t } = useTranslation();

  const organisation = window.sessionStorage.getItem("ORGANISATION_NAME") ?? "";
  // JUMBOTRON_TITLE / JUMBOTRON_SUBTITLE support the {ORGANISATION_NAME} placeholder
  // (same convention as menu titles). Empty/unset falls back to the translated default,
  // which always includes the organisation name.
  const title =
    processMenuTemplate(window.sessionStorage.getItem("JUMBOTRON_TITLE") ?? "") ||
    `${t("Woo-publications of")} ${organisation}`;
  const subtitle =
    processMenuTemplate(window.sessionStorage.getItem("JUMBOTRON_SUBTITLE") ?? "") ||
    `${t("On this page you will find the Woo-publications of")} ${organisation}`;

  return (
    <div
      style={{ backgroundImage: `url("${window.sessionStorage.getItem("JUMBOTRON_IMAGE_URL")}")` }}
      className={styles.wrapper}
    >
      <Page>
        <PageContent>
          {/* Purely presentational wrapper: the Heading1 inside provides the
              accessible structure. role="contentinfo" would declare a second
              footer landmark and aria-label is not allowed on a plain div. */}
          <CardWrapper className={styles.card}>
            <Heading1 className={clsx(styles.title, styles.hyphenated)}>{title}</Heading1>

            <Paragraph className={styles.description}>{subtitle}</Paragraph>
          </CardWrapper>
        </PageContent>
      </Page>
    </div>
  );
};
