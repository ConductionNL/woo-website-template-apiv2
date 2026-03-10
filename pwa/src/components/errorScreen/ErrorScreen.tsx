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
  Link,
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
          <Heading1 className={styles.title}>{t("Deze pagina is tijdelijk niet beschikbaar")}</Heading1>

          <Paragraph>
            {t(
              "We konden de gevraagde overheidsinformatie niet weergeven. Dit is waarschijnlijk een tijdelijk probleem aan onze kant — niets dat u heeft gedaan.",
            )}
          </Paragraph>

          <Paragraph>{t("Wat kunt u doen?")}</Paragraph>

          <OrderedList>
            <OrderedListItem>{t("Vernieuw de pagina en probeer het opnieuw.")}</OrderedListItem>
            <OrderedListItem>{t("Controleer uw internetverbinding.")}</OrderedListItem>
            {!isHomePage && (
              <OrderedListItem>
                {t("Ga terug naar de")}{" "}
                <Link
                  href="/"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  {t("homepage")}
                </Link>
                .
              </OrderedListItem>
            )}
            <OrderedListItem>{t("Als het probleem aanhoudt, neem dan contact op met de gemeente.")}</OrderedListItem>
          </OrderedList>

          {error && (
            <Alert className={styles.error} icon={<FontAwesomeIcon icon={faWarning} />} type="error">
              <strong>
                {t("Fout")} {error.name}:
              </strong>{" "}
              {error.message}
            </Alert>
          )}

          {!isHomePage && (
            <div className={styles.homeButtonWrapper}>
              <Button appearance="primary-action-button" onClick={() => navigate("/")}>
                {t("Terug naar de homepage")}
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
                    {showDetails ? t("Technische details verbergen") : t("Technische details tonen")}
                  </Button>
                </div>

                {showDetails && (
                  <div id="error-technical-details">
                    {error?.stack && (
                      <>
                        <Heading2>{t("Stack trace")}:</Heading2>
                        <HorizontalOverflowWrapper
                          ariaLabels={{
                            scrollLeftButton: t("Scroll naar links"),
                            scrollRightButton: t("Scroll naar rechts"),
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
