import { isEntityVisibleForUser } from "./menuUtils";

export const getPagesList = (data: any): any[] => {
    if (!data) return [];
    return Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
};

export const getPageBySlug = (
    items: any[],
    slug: string,
    userIsAuthenticated: boolean = false,
    userGroups: string[] = [],
): any | null => {
    if (!Array.isArray(items) || items.length === 0) return null;

    const isVisible = (p: any): boolean => {
        const hideBefore = Boolean(p?.hideBeforeLogin);
        const hideAfter = Boolean(p?.hideAfterLogin);

        if (!userIsAuthenticated && hideBefore) return false;
        if (userIsAuthenticated && hideAfter) return false;

        return isEntityVisibleForUser(p, userIsAuthenticated, userGroups);
    };

    const normalizedSlug = String(slug ?? "").trim();
    const candidate = items.find((p: any) => (p?.slug ?? "") === normalizedSlug);
    if (!candidate) return null;

    return isVisible(candidate) ? candidate : null;
};

export const getPageHtmlFromContents = (page: any): string => {
    if (!page) return "";
    const blocks: any[] = Array.isArray(page?.contents) ? page.contents : [];
    const richTexts = blocks
        .filter((b: any) => (b?.type ?? "") === "RichText")
        .sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
        .map((b: any) => b?.data?.content ?? "");
    return richTexts.join("\n");
};


