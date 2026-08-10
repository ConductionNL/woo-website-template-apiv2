import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string => {
  if (typeof html !== "string") return "";
  // DOMPurify needs a browser DOM; during SSR the page content has not been fetched yet.
  if (typeof window === "undefined") return "";
  // svg profile included: markdown/HTML content may contain inline SVG that the
  // htmlParser hooks render; DOMPurify still strips scripts and event handlers.
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true, svg: true, svgFilters: true }, ADD_ATTR: ["target"] });
};
