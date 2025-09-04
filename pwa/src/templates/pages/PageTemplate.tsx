import * as React from "react";
import { Page, PageContent, AccordionProvider } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { usePages } from "../../hooks/pages";
import { ParsedHTML } from "../../components/ParsedHTML/ParsedHTML";
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

    const htmlContent = React.useMemo(() => getPageHtmlFromContents(page), [page]);

    const faqSections = React.useMemo(() => {
        if (!page) return [] as { label: string; body: string }[];
        const blocks: any[] = Array.isArray(page?.contents) ? page.contents : [];
        const faqs: { label: string; body: string }[] = [];
        blocks
            .filter((b: any) => (b?.type ?? "") === "Faq")
            .sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
            .forEach((b: any) => {
                const items: any[] = Array.isArray(b?.data?.faqs) ? b.data.faqs : [];
                items.forEach((it: any) => {
                    const question: string = it?.question ?? "";
                    const answer: string = it?.answer ?? "";
                    if (question || answer) faqs.push({ label: question, body: answer });
                });
            });
        return faqs;
    }, [page]);

    const fakeQuery = {
        data: htmlContent,
        isLoading: pagesQuery.isLoading,
        isError: pagesQuery.isError,
    } as any;

    const hasContent = typeof htmlContent === "string" && htmlContent.trim().length > 0;

    const location = `/page/${slug}`;

    return (
        <Page>
            <PageContent>
                {faqSections.length > 0 ? (
                    <>
                        <ParsedHTML contentQuery={fakeQuery} location={location} />
                        <AccordionProvider sections={faqSections as any} />
                    </>
                ) : (
                    <ParsedHTML contentQuery={fakeQuery} location={location} />
                )}
            </PageContent>
        </Page>
    );
};


