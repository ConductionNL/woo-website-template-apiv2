import * as React from "react";
import * as styles from "./MaintenanceScreen.module.css";
import {
  Page,
  PageContent,
  Heading1,
  Heading2,
  Paragraph,
  Separator,
} from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";

// Configured texts replace the defaults per language; plain text, shown as written
const configured = (key: string): string | undefined => window.sessionStorage.getItem(key)?.trim() || undefined;

export const MaintenanceScreen: React.FC = () => {
  const { i18n } = useTranslation();

  // The screen has no language switch, so it always shows both languages:
  // Dutch first, then English, each marked with its own lang attribute (WCAG 3.1.2).
  const tNl = i18n.getFixedT("nl");
  const tEn = i18n.getFixedT("en");

  return (
    <Page>
      <PageContent>
        {/* Spacing lives on these own elements (gap): the Utrecht component styles
            reset the margins of headings, paragraphs and the separator */}
        <div className={styles.content}>
          <section lang="nl" className={styles.section}>
            <Heading1>{configured("MAINTENANCE_TITLE_NL") ?? tNl("This website is temporarily unavailable")}</Heading1>
            <MaintenanceMessage message={configured("MAINTENANCE_MESSAGE_NL")} t={tNl} />
          </section>

          <Separator className={styles.separator} />

          <section lang="en" className={styles.section}>
            <Heading2>{configured("MAINTENANCE_TITLE_EN") ?? tEn("This website is temporarily unavailable")}</Heading2>
            <MaintenanceMessage message={configured("MAINTENANCE_MESSAGE_EN")} t={tEn} />
          </section>
        </div>
      </PageContent>
    </Page>
  );
};

interface MaintenanceMessageProps {
  message?: string;
  t: (key: string) => string;
}

const MaintenanceMessage: React.FC<MaintenanceMessageProps> = ({ message, t }) => {
  if (message)
    return (
      <div className={styles.message}>
        <Paragraph>{message}</Paragraph>
      </div>
    );

  // Default text follows Dutch government outage notices (Belastingdienst, CIBG
  // error-page pattern): what is wrong, what you can do, apology last. Same text as
  // the neutral static fallback page (static/maintenance.html); keep them in sync.
  return (
    <div className={styles.message}>
      <Paragraph>{t("We are working to make it available again as soon as possible.")}</Paragraph>
      <Paragraph>{t("Please try again later.")}</Paragraph>
      <Paragraph>{t("We apologise for the inconvenience.")}</Paragraph>
    </div>
  );
};
