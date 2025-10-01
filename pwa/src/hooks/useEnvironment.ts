import * as React from "react";
import { getConfig } from "../services/getConfig";
import { uniqueId } from "lodash";

export const useEnvironment = () => {
  const [, setSessionStorageUpdatedId] = React.useState("-1");

  const handleStorageChange = () => {
    setSessionStorageUpdatedId(uniqueId());
    themeSwitcherMiddleware();
  };

  const updateSessionStorage = () => {
    window.dispatchEvent(new Event("sessionStorageChange"));
    const analyticsElement = document.getElementById("analytics");
    window.sessionStorage.getItem("ANALYTICS_URL") &&
      analyticsElement?.setAttribute("src", window.sessionStorage.getItem("ANALYTICS_URL") ?? "");
  };

  React.useEffect(() => {
    window.addEventListener("sessionStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("sessionStorageChange", handleStorageChange);
    };
  }, []);

  const overlayFromRuntimeJson = async () => {
    try {
      const res = await fetch("/config/runtime.json", { cache: "no-store" });
      if (!res.ok) return;
      const cfg = await res.json();
      const set = (k: string, envKey?: string) => {
        const v = cfg[k] ?? (envKey ? cfg[envKey] : undefined);
        if (typeof v === "string") window.sessionStorage.setItem(k, v);
      };
      set("NL_DESIGN_THEME_CLASSNAME", "GATSBY_NL_DESIGN_THEME_CLASSNAME");
      set("FAVICON_URL", "GATSBY_FAVICON_URL");
      set("ORGANISATION_NAME", "GATSBY_ORGANISATION_NAME");
      set("JUMBOTRON_IMAGE_URL", "GATSBY_JUMBOTRON_IMAGE_URL");
      set("FOOTER_LOGO_URL", "GATSBY_FOOTER_LOGO_URL");
      set("FOOTER_LOGO_HREF", "GATSBY_FOOTER_LOGO_HREF");
      set("FOOTER_CONTENT", "GATSBY_FOOTER_CONTENT");
      set("FOOTER_CONTENT_HEADER", "GATSBY_FOOTER_CONTENT_HEADER");
      set("OIDN_NUMBER", "GATSBY_OIDN_NUMBER");
      set("SHOW_CATEGORY", "GATSBY_SHOW_CATEGORY");
      set("SHOW_ORGANIZATION", "GATSBY_SHOW_ORGANIZATION");
      set("ANALYTICS_URL", "GATSBY_ANALYTICS_URL");
      set("DATE_FULL_MONTH", "GATSBY_DATE_FULL_MONTH");
      // Apply theme class immediately if provided
      const themeClass = window.sessionStorage.getItem("NL_DESIGN_THEME_CLASSNAME") ?? "conduction-theme";
      if (typeof document !== "undefined") {
        document.documentElement.className = themeClass;
        document.body.className = themeClass;
      }
      updateSessionStorage();
    } catch (_) {}
  };

  const initiateFromEnv = async () => {
    window.sessionStorage.setItem("SHOW_THEME_SWITCHER", process.env.GATSBY_SHOW_THEME_SWITCHER ?? "");
    window.sessionStorage.setItem(
      "API_BASE_URL",
      process.env.GATSBY_DEV_ENVIRONMENT === "true"
        ? "https://opencatalogi.accept.commonground.nu/apps/opencatalogi/api"
        : process.env.GATSBY_API_BASE_URL ?? "",
    );
    window.sessionStorage.setItem("NL_DESIGN_THEME_CLASSNAME", process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME ?? "");
    window.sessionStorage.setItem("FAVICON_URL", process.env.GATSBY_FAVICON_URL ?? "");
    window.sessionStorage.setItem("ORGANISATION_NAME", process.env.GATSBY_ORGANISATION_NAME ?? "");
    window.sessionStorage.setItem("JUMBOTRON_IMAGE_URL", process.env.GATSBY_JUMBOTRON_IMAGE_URL ?? "");
    window.sessionStorage.setItem("FOOTER_LOGO_URL", process.env.GATSBY_FOOTER_LOGO_URL ?? "");
    window.sessionStorage.setItem("FOOTER_LOGO_HREF", process.env.GATSBY_FOOTER_LOGO_HREF ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT", process.env.GATSBY_FOOTER_CONTENT ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT_HEADER", process.env.GATSBY_FOOTER_CONTENT_HEADER ?? "");
    window.sessionStorage.setItem("OIDN_NUMBER", process.env.GATSBY_OIDN_NUMBER ?? "");
    window.sessionStorage.setItem("SHOW_CATEGORY", process.env.GATSBY_SHOW_CATEGORY ?? "");
    window.sessionStorage.setItem("SHOW_ORGANIZATION", process.env.GATSBY_SHOW_ORGANIZATION ?? "");
    window.sessionStorage.setItem("ANALYTICS_URL", process.env.GATSBY_ANALYTICS_URL ?? "");
    window.sessionStorage.setItem("DATE_FULL_MONTH", process.env.GATSBY_DATE_FULL_MONTH ?? "");
    // CSP overrides (optional)
    window.sessionStorage.setItem("CSP_CONNECT_SRC_FULL", process.env.GATSBY_CSP_CONNECT_SRC_FULL ?? "");
    window.sessionStorage.setItem("CSP_CONNECT_SRC_EXTRA", process.env.GATSBY_CSP_CONNECT_SRC_EXTRA ?? "");

    updateSessionStorage();
    await overlayFromRuntimeJson();
  };

  const initiateFromJSON = (themeOrDomainName: string, host: string) => {
    const config = getConfig(themeOrDomainName, host);

    if (!config) return; // no config found, nothing else to do

    window.sessionStorage.setItem("SHOW_THEME_SWITCHER", config.GATSBY_SHOW_THEME_SWITCHER ?? "");
    window.sessionStorage.setItem(
      "API_BASE_URL",
      process.env.GATSBY_DEV_ENVIRONMENT === "true"
        ? "https://opencatalogi.accept.commonground.nu/apps/opencatalogi/api"
        : config.GATSBY_API_BASE_URL ?? "",
    );
    window.sessionStorage.setItem("NL_DESIGN_THEME_CLASSNAME", config.GATSBY_NL_DESIGN_THEME_CLASSNAME ?? "");
    window.sessionStorage.setItem("FAVICON_URL", config.GATSBY_FAVICON_URL ?? "");
    window.sessionStorage.setItem("ORGANISATION_NAME", config.GATSBY_ORGANISATION_NAME ?? "");
    window.sessionStorage.setItem("JUMBOTRON_IMAGE_URL", config.GATSBY_JUMBOTRON_IMAGE_URL ?? "");
    window.sessionStorage.setItem("FOOTER_LOGO_URL", config.GATSBY_FOOTER_LOGO_URL ?? "");
    window.sessionStorage.setItem("FOOTER_LOGO_HREF", config.GATSBY_FOOTER_LOGO_HREF ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT", config.GATSBY_FOOTER_CONTENT ?? "");
    window.sessionStorage.setItem("FOOTER_CONTENT_HEADER", config.GATSBY_FOOTER_CONTENT_HEADER ?? "");
    window.sessionStorage.setItem("OIDN_NUMBER", config.GATSBY_OIDN_NUMBER ?? "");
    window.sessionStorage.setItem("SHOW_CATEGORY", config.GATSBY_SHOW_CATEGORY ?? "");
    window.sessionStorage.setItem("SHOW_ORGANIZATION", config.GATSBY_SHOW_ORGANIZATION ?? "");
    window.sessionStorage.setItem("ANALYTICS_URL", config.GATSBY_ANALYTICS_URL ?? "");
    window.sessionStorage.setItem("DATE_FULL_MONTH", config.GATSBY_DATE_FULL_MONTH ?? "");
    // CSP overrides (optional)
    window.sessionStorage.setItem("CSP_CONNECT_SRC_FULL", config.GATSBY_CSP_CONNECT_SRC_FULL ?? "");
    window.sessionStorage.setItem("CSP_CONNECT_SRC_EXTRA", config.GATSBY_CSP_CONNECT_SRC_EXTRA ?? "");

    updateSessionStorage();
  };

  const themeSwitcherMiddleware = () => {
    switch (window.location.hostname) {
      case "koophulpje.nl":
        // case "localhost": // development purposes
        window.sessionStorage.setItem("SHOW_THEME_SWITCHER", "true");
        break;
    }

    switch (window.location.pathname) {
      case "/woo-website-template-apiv2/":
        window.sessionStorage.setItem("SHOW_THEME_SWITCHER", "true");
        break;
    }

    if (process.env.GATSBY_SHOW_THEME_SWITCHER === "true") window.sessionStorage.setItem("SHOW_THEME_SWITCHER", "true");
  };

  return { initiateFromEnv, initiateFromJSON };
};
