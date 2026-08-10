import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import clsx from "clsx";
import { PageHeader, SkipLink, Button } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../context/gatsby";
import { navigate, withPrefix } from "gatsby";
import { Logo } from "@conduction/components";
import { useMenus } from "../../../hooks/menus";
import { getMenuFromPosition } from "../../../services/menuUtils";

interface HeaderTemplateProps {
  layoutClassName: string;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ layoutClassName }) => {
  const { t, i18n } = useTranslation();
  const { gatsbyContext } = useGatsbyContext();
  const menusQuery = useMenus().getAll();

  const allMenus: any[] = React.useMemo(() => {
    const data: any = (menusQuery as any)?.data;
    return Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
  }, [menusQuery?.data]);

  const menuNavigation = React.useMemo(() => getMenuFromPosition(allMenus, 1), [allMenus]);
  const quickLinks: any[] = React.useMemo(() => (menuNavigation?.items ?? []).slice(0, 4), [menuNavigation?.items]);

  return (
    <PageHeader className={clsx(layoutClassName && layoutClassName, "ac-header")}>
      <div role="navigation" aria-label="skip" className={styles.container}>
        <div>
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
        <div className={styles.navContainer}>
          <Logo
            onClick={() => navigate("/")}
            ariaLabel={"Logo " + (window.sessionStorage.getItem("ORGANISATION_NAME") ?? "")}
            layoutClassName={styles.logo}
          />
          <div>
            {quickLinks?.length > 0 && (
              <nav role="navigation" aria-label={t("Quick links")} className={styles.quickLinks}>
                {quickLinks.map((item: any, idx: number) => {
                  const isExternal =
                    typeof item?.link === "string" && (/^https?:\/\//i.test(item.link) || /^www\./i.test(item.link));
                  const href = isExternal && /^www\./i.test(item.link) ? `https://${item.link}` : item.link;

                  return isExternal ? (
                    <Button
                      key={idx}
                      appearance="secondary"
                      onClick={() => open(href, "_blank", "noopener,noreferrer")}
                      tabIndex={0}
                      aria-label={`${t(item?.ariaLabel ?? item?.name ?? "Link")}, ${t("Opens a new window")}`}
                    >
                      {t(item?.name ?? "")}
                    </Button>
                  ) : (
                    <Button
                      key={idx}
                      appearance="secondary"
                      onClick={() => navigate(item?.link ?? "/")}
                      tabIndex={0}
                      aria-label={t(item?.ariaLabel ?? item?.name ?? "Link")}
                    >
                      {t(item?.name ?? "")}
                    </Button>
                  );
                })}
              </nav>
            )}
            {/* GATSBY_HIDE_LANGUAGE_SWITCH: set to "true" to hide the NL/EN switch.
                Untranslated (Dutch) API content cannot be marked with the correct
                lang attribute per element, so an all-Dutch page is the way to
                satisfy WCAG 3.1.2 for municipalities that get audited on it. */}
            {window.sessionStorage.getItem("HIDE_LANGUAGE_SWITCH") !== "true" && quickLinks?.length === 0 && (
              <nav role="navigation" aria-label={t("Language select")} className={styles.languageSelectContainer}>
                <span
                  className={clsx(styles.languageSelect, i18n.language === "nl" && styles.languageSelectDisabled)}
                  onClick={() => i18n.changeLanguage("nl")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      i18n.changeLanguage("nl");
                    }
                  }}
                  tabIndex={0}
                  aria-label={t("Translate page to Dutch")}
                  role="button"
                  aria-pressed={i18n.language === "nl" ? true : false}
                  aria-disabled={i18n.language === "nl" ? true : false}
                >
                  NL
                </span>
                <span className={styles.languageSeperator} aria-hidden="true">
                  {" "}
                  /{" "}
                </span>
                <span
                  className={clsx(styles.languageSelect, i18n.language === "en" && styles.languageSelectDisabled)}
                  onClick={() => i18n.changeLanguage("en")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      i18n.changeLanguage("en");
                    }
                  }}
                  tabIndex={0}
                  aria-label={t("Translate page to English")}
                  role="button"
                  aria-pressed={i18n.language === "en" ? true : false}
                  aria-disabled={i18n.language === "en" ? true : false}
                >
                  EN
                </span>
              </nav>
            )}
          </div>
        </div>
      </div>
    </PageHeader>
  );
};
