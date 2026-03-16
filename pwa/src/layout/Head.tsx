import * as React from "react";
import _ from "lodash";
import "../styling/index.css";
import { Helmet } from "react-helmet";
import { getPageTitle } from "../services/getPageTitle";
import { useGatsbyContext } from "../context/gatsby";
import { useTranslation } from "react-i18next";
import { languageOptions } from "../data/languageOptions";
import { connectSrcStandard, connectSrcMunicipalities, connectSrcOther, connectSrcLocal } from "../data/connectSrc";

export const Head: React.FC = () => {
  const { gatsbyContext } = useGatsbyContext();
  const { t, i18n } = useTranslation();

  const isLocalHost =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const [connectSrc, setConnectSrc] = React.useState<string>(
    `${connectSrcStandard} ${connectSrcMunicipalities} ${connectSrcOther} ${isLocalHost ? connectSrcLocal : ""}`,
  );
  const [analyticsUrl, setAnalyticsUrl] = React.useState<string>(
    window.sessionStorage.getItem("ANALYTICS_URL") ?? "",
  );

  const processUrls = (urlString: string): string => {
    if (!urlString) return "";

    return Array.from(urlString.split(/[\s\n]+/).filter(Boolean))
      .map((url) => url.replace(/^(http|https):\/\//, "wss://") + ",")
      .join(" ");
  };

  const translatedCrumbs = gatsbyContext.pageContext?.breadcrumb.crumbs.map((crumb: any) => ({
    ...crumb,
    crumbLabel: t(_.upperFirst(crumb.crumbLabel)),
  }));

  const currentLanguage = languageOptions.find(
    (language) => language.label === (i18n.language.toUpperCase() === "EN" ? "US" : i18n.language.toUpperCase()),
  )?.value;

  const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf("CriOS") == -1 &&
    navigator.userAgent.indexOf("FxiOS") == -1;

  React.useEffect(() => {
    if (isSafari) {
      setConnectSrc(
        `${processUrls(connectSrcStandard)} ${processUrls(connectSrcMunicipalities)} ${processUrls(connectSrcOther)} ${processUrls(
          isLocalHost ? connectSrcLocal : "",
        )}`,
      );
    }
  }, [isSafari, isLocalHost]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      setAnalyticsUrl(window.sessionStorage.getItem("ANALYTICS_URL") ?? "");
    };
    window.addEventListener("sessionStorageChange", handleStorageChange);
    return () => window.removeEventListener("sessionStorageChange", handleStorageChange);
  }, []);

  return (
    <Helmet
      htmlAttributes={{
        lang: currentLanguage,
      }}
      bodyAttributes={{
        class: window.sessionStorage.getItem("NL_DESIGN_THEME_CLASSNAME"),
      }}
    >
      <meta
        httpEquiv="Content-Security-Policy"
        content={`
        default-src 'self';
        base-uri 'self';
        frame-src 'self';
        img-src 'self' data: https://raw.githubusercontent.com/ConductionNL/ https://conduction.nl *.commonground.nu;
        form-action 'self';
        connect-src 'self' ${connectSrc};
        style-src 'self' 'unsafe-inline';
        font-src * data:;
        script-src 'self' ${analyticsUrl ? new URL(analyticsUrl).origin : ""} ${location.hostname === "localhost" ? "'unsafe-eval'" : ""};
        `}
      ></meta>
      <title>{`Woo | ${window.sessionStorage.getItem("ORGANISATION_NAME")} | ${
        getPageTitle(translatedCrumbs, gatsbyContext.location) ?? "Error"
      }`}</title>
      <link rel="icon" type="svg" href={window.sessionStorage.getItem("FAVICON_URL") ?? ""} />
      {analyticsUrl && <script id="analytics" async src={analyticsUrl} />}
    </Helmet>
  );
};
