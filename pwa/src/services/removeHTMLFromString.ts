export const removeHTMLFromString = (html: string) => {
  // DOMParser creates an inert document: nothing is loaded or executed while parsing.
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
