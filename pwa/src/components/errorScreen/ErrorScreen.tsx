import * as React from "react";
import * as styles from "./ErrorScreen.module.css";
import {
  Page,
  PageContent,
  Heading1,
  Heading2,
  Paragraph,
  Button,
  Alert,
  CodeBlock,
  OrderedList,
  OrderedListItem,
  Separator,
} from "@utrecht/component-library-react/dist/css-module";
import { HorizontalOverflowWrapper } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";

interface ErrorScreenProps {
  error: Error | null;
  errorInfo?: React.ErrorInfo | null;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, errorInfo }) => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = React.useState(false);

  const isHomePage = typeof window !== "undefined" && window.location.pathname === "/";

  return (
    <div className={styles.wrapper}>
      <Page>
        <PageContent className={styles.container}>
          <Heading1 className={styles.title}>{t("This page is temporarily unavailable")}</Heading1>

          <Paragraph>{t("The requested government information cannot currently be displayed.")}</Paragraph>

          <OrderedList>
            <OrderedListItem>{t("Refresh the page to try again.")}</OrderedListItem>
            <OrderedListItem>{t("Check if you have an active internet connection.")}</OrderedListItem>

            <OrderedListItem>{t("If the problem persists, please contact the municipality.")}</OrderedListItem>
          </OrderedList>

          {error && (
            <Alert className={styles.error} icon={<FontAwesomeIcon icon={faWarning} />} type="error">
              <strong>
                {t("Error")} {error.name}:
              </strong>{" "}
              {error.message}
            </Alert>
          )}

          {!isHomePage && (
            <div className={styles.homeButtonWrapper}>
              <Button appearance="primary-action-button" onClick={() => navigate("/")}>
                {t("Back to homepage")}
              </Button>
            </div>
          )}

          {errorInfo && (
            <>
              <Separator />
              <div className={styles.detailsSection}>
                <div className={styles.toggleButtonWrapper}>
                  <Button
                    appearance="secondary-action-button"
                    aria-expanded={showDetails}
                    aria-controls="error-technical-details"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? t("Hide technical details") : t("Show technical details")}
                  </Button>
                </div>

                {showDetails && (
                  <div id="error-technical-details">
                    {error?.stack && (
                      <>
                        <Heading2>{t("Stack trace")}:</Heading2>
                        <HorizontalOverflowWrapper
                          ariaLabels={{
                            scrollLeftButton: t("Scroll left"),
                            scrollRightButton: t("Scroll right"),
                          }}
                        >
                          <CodeBlock className={styles.codeBlock}>{error.stack}</CodeBlock>
                        </HorizontalOverflowWrapper>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </PageContent>
      </Page>
    </div>
  );
};
