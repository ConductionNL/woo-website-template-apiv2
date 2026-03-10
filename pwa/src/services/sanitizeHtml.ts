export const sanitizeHtml = (html: string): string => {
    if (typeof html !== "string") return "";
    let safe = html;
    safe = safe.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
    safe = safe.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
    safe = safe.replace(/ on[a-z]+\s*=\s*"[^"]*"/gi, "");
    safe = safe.replace(/ on[a-z]+\s*=\s*'[^']*'/gi, "");
    safe = safe.replace(/ on[a-z]+\s*=\s*[^\s>]+/gi, "");
    safe = safe.replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"');
    safe = safe.replace(/href\s*=\s*'javascript:[^']*'/gi, "href='#'");
    return safe;
};
