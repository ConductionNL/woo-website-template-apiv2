import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import parse from "html-react-parser";
import {
  PageFooter,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Icon,
} from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Logo } from "@conduction/components";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";
import { useMenus } from "../../../hooks/menus";
import { getMenusFromPositions } from "../../../services/menuUtils";
import { useFooterContent } from "../../../hooks/footerContent";

export const DEFAULT_FOOTER_CONTENT_URL =
  "https://raw.githubusercontent.com/ConductionNL/woo-website-template/main/pwa/src/templates/templateParts/footer/FooterContent.json";

type TDynamicContentItem = {
  title: string;
  items: {
    value: string;
    ariaLabel: string;
    link?: string;
    markdownLink?: string;
    multiRow?: string;
    label?: string;
    title?: string;
    name?: string;
    valueMode?: "value" | "title" | "multiRow";
    iconMode?: "standard" | "custom";
    linkMode?: "link" | "markdown";
    icon?: {
      icon: IconName;
      prefix: IconPrefix;
      placement: "left" | "right";
    };
    customIcon?: {
      icon: string;
      placement: "left" | "right";
    };
  }[];
};

export const FooterTemplate: React.FC = () => {
  const menusQuery = useMenus().getAll();
  const footerContentQuery = useFooterContent().getContent();
  const footerSections: TDynamicContentItem[] | undefined = React.useMemo(() => {
    const data: any = (menusQuery as any)?.data;

    if (!data) return undefined;

    const list: any[] = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];

    const pick = (obj: any, keys: string[]): string | undefined =>
      keys.map((k) => obj?.[k]).find((v) => typeof v === "string" && v.length > 0);

    const menus = getMenusFromPositions(list, [3, 4, 5]);

    const sections: TDynamicContentItem[] = (menus ?? []).map((m: any) => {
      const title = pick(m, ["name", "title", "label"]) ?? "";
      const items = Array.isArray(m?.items) ? m.items : [];
      return {
        title,
        items: items as any,
      } as TDynamicContentItem;
    });

    return sections.length > 0 ? sections : undefined;
  }, [menusQuery?.data]);

  const footerContentSections: TDynamicContentItem[] | undefined = React.useMemo(() => {
    const data: any = (footerContentQuery as any)?.data;
    if (!data) return undefined;
    return Array.isArray(data) ? (data as TDynamicContentItem[]) : undefined;
  }, [footerContentQuery?.data]);

  // For development
  // const [footerContent, setFooterContent] = React.useState<TDynamicContentItem[]>([]);
  // React.useEffect(() => {
  //   const data = require("./FooterContent.json");
  //   setFooterContent(data);
  // }, []);

  const sectionsToRender = footerSections ?? footerContentSections;

  return (
    <PageFooter className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {sectionsToRender?.map((content: TDynamicContentItem, idx: number) => (
            <DynamicSection key={idx} {...{ content }} />
          ))}
        </div>
        <div className={styles.logoAndConduction}>
          {window.sessionStorage.getItem("FOOTER_LOGO_URL") !== "false" && (
            <Logo
              variant="footer"
              onClick={() =>
                window.sessionStorage.getItem("FOOTER_LOGO_HREF")
                  ? open(window.sessionStorage.getItem("FOOTER_LOGO_HREF") ?? "")
                  : navigate("/")
              }
            />
          )}

          <WithLoveByConduction />
        </div>
      </div>
    </PageFooter>
  );
};

const DynamicSection: React.FC<{ content: TDynamicContentItem }> = ({ content }) => {
  const { t } = useTranslation();

  return (
    <section>
      <DynamicSectionHeading heading={window.sessionStorage.getItem("FOOTER_CONTENT_HEADER") ?? ""} {...{ content }} />

      {content.items.map((item, idx) => (
        <div key={idx} className={styles.dynamicSectionContent}>
          {item.valueMode === "title" && (
            <DynamicItemHeading
              heading={window.sessionStorage.getItem("FOOTER_CONTENT_HEADER") ?? ""}
              title={item.value ?? item.name}
            />
          )}
          {item.label && <strong>{t(item.label)}</strong>}

          {/* External Link */}
          {((item.linkMode === "link" || (!item.linkMode && item.link)) &&
            item.link &&
            (/^https?:\/\//i.test(item.link) || /^www\./i.test(item.link))) && (
            <ExternalLink {...{ item }} />
          )}

          {/* Internal Link */}
          {(item.linkMode === "link" || (!item.linkMode && item.link)) &&
            item.valueMode !== "multiRow" &&
            item.valueMode !== "title" &&
            item.link &&
            !(/^https?:\/\//i.test(item.link) || /^www\./i.test(item.link)) && <InternalLink {...{ item }} />}

          {/* Internal Link Github/Markdown link */}
          {(item.linkMode === "markdown" || (!item.linkMode && item.markdownLink)) && (item.link || item.markdownLink) && (
            <MarkdownLink {...{ item }} />
          )}

          {/* MultiRow */}
          {item.valueMode === "multiRow" && <MultiRow {...{ item }} />}

          {/* No Link */}
          {!item.link && item.valueMode !== "multiRow" && <NoLink {...{ item }} />}
        </div>
      ))}
    </section>
  );
};

const DynamicSectionHeading: React.FC<{ content: TDynamicContentItem; heading?: string }> = ({ content, heading }) => {
  const { t } = useTranslation();

  switch (heading) {
    case "heading-1":
      return <Heading1 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading1>;
    case "heading-2":
      return <Heading2 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading2>;
    case "heading-3":
      return <Heading3 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading3>;
    case "heading-4":
      return <Heading4 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading4>;
    case "heading-5":
      return <Heading5 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading5>;
    default:
      return <Heading3 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading3>;
  }
};

const DynamicItemHeading: React.FC<{ title: string; heading?: string }> = ({ title, heading }) => {
  const { t } = useTranslation();

  switch (heading) {
    case "heading-1":
      return <Heading1 className={styles.dynamicItemHeading}>{t(title)}</Heading1>;
    case "heading-2":
      return <Heading2 className={styles.dynamicItemHeading}>{t(title)}</Heading2>;
    case "heading-3":
      return <Heading3 className={styles.dynamicItemHeading}>{t(title)}</Heading3>;
    case "heading-4":
      return <Heading4 className={styles.dynamicItemHeading}>{t(title)}</Heading4>;
    case "heading-5":
      return <Heading5 className={styles.dynamicItemHeading}>{t(title)}</Heading5>;
    default:
      return <Heading3 className={styles.dynamicItemHeading}>{t(title)}</Heading3>;
  }
};

const WithLoveByConduction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Link
        className={styles.withLoveLink}
        href="https://github.com/ConductionNL/woo-website-template"
        target="_blank"
        aria-label={`${t("Link to github repository")}, ${t("Opens a new window")}`}
      >
        <Icon>
          <FontAwesomeIcon icon={faCode} />
        </Icon>
      </Link>{" "}
      with{" "}
      <Link
        className={styles.withLoveLink}
        href="https://github.com/ConductionNL/woo-website-template/graphs/contributors"
        target="_blank"
        aria-label={`${t("Link to github contributors page")}, ${t("Opens a new window")}`}
      >
        <Icon>
          <FontAwesomeIcon icon={faHeart} />
        </Icon>
      </Link>{" "}
      by{" "}
      <Link
        className={styles.withLoveLink}
        href="https://conduction.nl"
        target="_blank"
        aria-label={`${t("Link to conduction website")}, ${t("Opens a new window")}`}
      >
        <span className={styles.withLoveConductionLink}> Conduction.</span>
      </Link>
    </div>
  );
};

interface LinkComponentProps {
  item: any;
}

const renderIcon = (item: any, side: "left" | "right") => {
  try {
    const mode: string | undefined =
      typeof item?.iconMode === "string"
        ? item.iconMode
        : item?.customIcon
        ? "custom"
        : item?.icon
        ? "standard"
        : undefined;
    const className = side === "left" ? styles.iconLeft : styles.iconRight;

    if (mode === "custom") {
      if (typeof item?.customIcon === "string") {
        if (item.iconPlacement === side) return <Icon className={className}>{parse(item.customIcon)}</Icon>;
        return null;
      }
      if (item?.customIcon?.icon) {
        const placement = item.customIcon.placement ?? item.iconPlacement;
        if (placement === side) return <Icon className={className}>{parse(item.customIcon.icon)}</Icon>;
        return null;
      }
      return null;
    }

    if (mode === "standard") {
      if (item?.icon && item.iconPlacement === side && item.icon) {
        return <FontAwesomeIcon className={className} icon={[item.iconPrefix, item.icon]} />;
      }
      return null;
    }

    return null;
  } catch (e) {
    return null;
  }
};

const ExternalLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  // Ensure www. links have https:// protocol
  const getFullUrl = (link: string) => {
    if (/^www\./i.test(link)) {
      return `https://${link}`;
    }
    return link;
  };

  return (
    <Link
      className={styles.link}
      href={getFullUrl(item.link)}
      target="_blank"
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${item.value || item.name}, ${t("Opens a new window")}`}
    >
      {renderIcon(item, "left")}
      {t(item.value || item.name)}
      {renderIcon(item, "right")}
    </Link>
  );
};

const InternalLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={styles.link}
      onClick={(e: any) => {
        (e.preventDefault(), navigate(item.link ?? ""));
      }}
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${t(item.value ?? item.name)}`}
      role="button"
      href={item.link}
    >
      {renderIcon(item, "left")}
      {t(item.value ?? item.name)}
      {renderIcon(item, "right")}
    </Link>
  );
};

const MarkdownLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={styles.link}
      onClick={(e: any) => {
        (e.preventDefault(), navigate(`/markdown/${item.name.replaceAll(" ", "_")}/?link=${item.link}`));
      }}
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${t(item.link)}`}
      role="button"
      href={item.link}
    >
      {renderIcon(item, "left")}
      {t(item.value ?? item.name)}
      {renderIcon(item, "right")}
    </Link>
  );
};

const MultiRow: React.FC<LinkComponentProps> = ({ item }) => {
  console.log("multirow", item.value);

  return (
    <span className={styles.multiRow}>
      {renderIcon(item, "left")}
      <div>{item.value ?? item.name}</div>
      {renderIcon(item, "right")}
    </span>
  );
};

const NoLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <span>
      {renderIcon(item, "left")}
      {t(item.value ?? item.name)}
      {renderIcon(item, "right")}
    </span>
  );
};
