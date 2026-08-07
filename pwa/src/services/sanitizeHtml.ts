import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string => {
  if (typeof html !== "string") return "";
  // DOMPurify needs a browser DOM; during SSR the page content has not been fetched yet.
  if (typeof window === "undefined") return "";
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, ADD_ATTR: ["target"] });
};
