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

  const [connectSrc, setConnectSrc] = React.useState<string>(
    `${connectSrcStandard} ${connectSrcMunicipalities} ${connectSrcOther} ${
      window.location.hostname === "localhost" ? connectSrcLocal : ""
    }`,
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
          window.location.hostname === "localhost" ? connectSrcLocal : "",
        )}`,
      );
    }
  }, [isSafari]);

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
        ${location.hostname === "localhost" && "script-src 'self' 'unsafe-eval';"}
        `}
      ></meta>
      <title>{`Woo | ${window.sessionStorage.getItem("ORGANISATION_NAME")} | ${
        getPageTitle(translatedCrumbs, gatsbyContext.location) ?? "Error"
      }`}</title>
      <link rel="icon" type="svg" href={window.sessionStorage.getItem("FAVICON_URL") ?? ""} />
    </Helmet>
  );
};
