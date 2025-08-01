import * as React from "react";
import * as styles from "./CardsResultsTemplate.module.css";
import { Heading2, Paragraph } from "@utrecht/component-library-react/dist/css-module";
import { translateDate } from "../../../services/dateFormat";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { CardHeader, CardHeaderDate, CardHeaderTitle, CardWrapper } from "@conduction/components";
import { TOOLTIP_ID } from "../../../layout/Layout";
import { removeHTMLFromString } from "../../../services/removeHTMLFromString";

interface CardsResultsTemplateProps {
  requests: any[];
}

export const CardsResultsTemplate: React.FC<CardsResultsTemplateProps> = ({ requests }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.componentsGrid} role="status" aria-live="polite" aria-atomic="true" aria-label={t("Woo Request")}>
        {requests.map((request) => (
          <CardWrapper
            role="region"
            key={request.id}
            className={styles.cardContainer}
            onClick={() => navigate(request.id.toString())}
            tabIndex={0}
            aria-label={`${
              request["@self"].published
                ? translateDate(i18n.language, request["@self"].published ?? request.publicatiedatum ?? request.created)
                : t("N/A")
            }, ${removeHTMLFromString(removeHTMLFromString(request.title ?? request.titel ?? request.name ?? request.naam ?? request.id))}, ${removeHTMLFromString(removeHTMLFromString(request.summary ?? request.samenvatting ?? t("No summary available")))} ${
              window.sessionStorage.getItem("SHOW_ORGANIZATION") === "true"
                ? `,${request.catalog?.organization?.title ?? request.organization?.title ?? t("No municipality available")}`
                : ""
            } ${
              window.sessionStorage.getItem("SHOW_CATEGORY") === "true"
                ? `, ${t("Category")}, ${request["@self"].schema.title || t("No category available")}`
                : ""
            }`}
          >
            <CardHeader className={styles.cardHeader}>
              <CardHeaderTitle className={styles.title}>
                <Heading2>
                  {removeHTMLFromString(
                    removeHTMLFromString(request.title ?? request.titel ?? request.name ?? request.naam ?? request.id),
                  ) ?? t("No title available")}
                </Heading2>
              </CardHeaderTitle>
              <CardHeaderDate>
                {request.publicatiedatum || request["@self"].published
                  ? translateDate(i18n.language, request.publicatiedatum || request["@self"].published)
                  : t("N/A")}
              </CardHeaderDate>
            </CardHeader>

            <Paragraph className={styles.description}>
              {removeHTMLFromString(
                removeHTMLFromString(request.summary ?? request.samenvatting ?? t("No summary available")),
              )}
            </Paragraph>

            {(window.sessionStorage.getItem("SHOW_CATEGORY") === "true" ||
              window.sessionStorage.getItem("SHOW_ORGANIZATION") === "true") && (
              <div className={styles.cardFooter}>
                {window.sessionStorage.getItem("SHOW_ORGANIZATION") === "true" && (
                  <CardHeaderDate>
                    <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Municipality")}>
                      {request.catalog?.organization?.title ?? request.organization?.title}
                    </span>
                  </CardHeaderDate>
                )}
                {window.sessionStorage.getItem("SHOW_CATEGORY") === "true" && (
                  <CardHeaderDate>
                    <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Category")}>
                      {request["@self"].schema.title || t("No category available")}
                    </span>
                  </CardHeaderDate>
                )}
              </div>
            )}
          </CardWrapper>
        ))}
      </div>
    </>
  );
};
