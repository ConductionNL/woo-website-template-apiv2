import * as React from "react";
import * as styles from "./ParsedHTML.module.css";
import Parser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import showdown from "showdown";
import { Alert } from "@utrecht/component-library-react/dist/css-module";
import { UseQueryResult } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useHtmlParser } from "../../hooks/htmlParser/useHtmlParser";
import { isHtml } from "../../services/isHtml";
import { sanitizeHtml } from "../../services/sanitizeHtml";
import { Link } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";

interface ParsedHTMLProps {
  contentQuery: UseQueryResult<any, Error>;
  location: string;
  layoutClassName?: string;
}

export const ParsedHTML: React.FC<ParsedHTMLProps> = ({ contentQuery, location, layoutClassName }) => {
  const { t } = useTranslation();
  const { options } = useHtmlParser(location);

  // showdown's converter output and raw remote HTML are untrusted; showdown
  // itself has unfixed XSS advisories, so sanitize before parsing to React.
  // Memoized: Layout re-renders on every sessionStorageChange and both the
  // conversion and the DOMPurify pass walk the whole document.
  const htmlContent = React.useMemo(() => {
    if (isHtml(contentQuery.data)) return sanitizeHtml(contentQuery.data, { allowSvg: true });

    showdown.setFlavor("github");
    const converted = new showdown.Converter().makeHtml(contentQuery.data);
    return sanitizeHtml(
      `<div><article class="markdown-body entry-content container-lg" itemprop="text">${converted}</article></div>`,
      { allowSvg: true },
    );
  }, [contentQuery.data]);

  if (contentQuery.isLoading)
    return (
      <div className={styles.container}>
        <Skeleton height="200px" />
      </div>
    );

  if (contentQuery.isError)
    return (
      <div className={styles.container}>
        <div>
          <Link
            className={styles.backLink}
            href="/"
            onClick={(e: any) => {
              (e.preventDefault(), navigate("/"));
            }}
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> <span>{t("Back to homepage")}</span>
          </Link>
        </div>
        <Alert icon={<FontAwesomeIcon icon={faWarning} />} type="error">
          Oops, something went wrong retrieving the .md file from GitHub.
        </Alert>
      </div>
    );

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <div>
        <Link
          className={styles.backLink}
          href="/"
          onClick={(e: any) => {
            (e.preventDefault(), navigate("/"));
          }}
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> <span>{t("Back to homepage")}</span>
        </Link>
      </div>
      {Parser(htmlContent, options)}
    </div>
  );
};
