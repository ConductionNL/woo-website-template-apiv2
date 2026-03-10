import * as React from "react";
import * as styles from "./PageTemplate.module.css";
import { Page, PageContent, AccordionProvider } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { usePages } from "../../hooks/pages";
import { sanitizeHtml } from "../../services/sanitizeHtml";
import { getPagesList, getPageBySlug, getPageHtmlFromContents } from "../../services/pageUtils";

interface PageTemplateProps {
  slug: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({ slug }) => {
  const { t } = useTranslation();
  const pagesQuery = usePages().getAll();

  const page = React.useMemo(() => {
    const data: any = (pagesQuery as any)?.data;
    const list: any[] = getPagesList(data);
    return getPageBySlug(list, slug);
  }, [pagesQuery?.data, slug]);

  const blocks: any[] = React.useMemo(
    () =>
      (Array.isArray(page?.contents) ? [...page.contents] : []).sort(
        (a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0),
      ),
    [page],
  );

  return (
    <Page>
      <PageContent className={styles.container}>
        {blocks.map((block: any, index: number) => {
          const type: string = block?.type ?? "";
          if (type === "RichText") {
            const html: string = sanitizeHtml(block?.data?.content ?? "");
            return <div key={`rt-${index}`} dangerouslySetInnerHTML={{ __html: html }} />;
          }
          if (type === "Faq") {
            const items: any[] = Array.isArray(block?.data?.faqs) ? block.data.faqs : [];
            const sections = items
              .filter((it: any) => (it?.question ?? it?.answer ?? "").length > 0)
              .map((it: any) => ({ label: it?.question ?? "", body: it?.answer ?? "" }));
            return <AccordionProvider key={`faq-${index}`} sections={sections as any} />;
          }
          return null;
        })}
      </PageContent>
    </Page>
  );
};
