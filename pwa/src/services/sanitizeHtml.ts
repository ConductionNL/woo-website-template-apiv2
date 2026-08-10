import DOMPurify from "dompurify";

// Any target="_blank" that survives sanitization (ADD_ATTR keeps target) gets
// the same rel="noopener noreferrer" the hand-written anchors carry.
// Registered once at module level; DOMPurify hooks are global to all calls.
// Guarded: in SSR DOMPurify is created without a window and has no hook API.
if (typeof window !== "undefined") {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node instanceof Element && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
}

export const sanitizeHtml = (html: string, { allowSvg = false }: { allowSvg?: boolean } = {}): string => {
  if (typeof html !== "string") return "";
  // DOMPurify needs a browser DOM; during SSR the page content has not been fetched yet.
  if (typeof window === "undefined") return "";
  // svg is opt-in per caller: ParsedHTML renders inline SVG from markdown
  // content, the other callers have no reason to accept it.
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true, svg: allowSvg }, ADD_ATTR: ["target"] });
};
