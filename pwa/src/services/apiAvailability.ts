import { AxiosError } from "axios";
import { withPrefix } from "gatsby";

// Statuses that mean the backend itself is gone (shut down or not reachable),
// as opposed to a single failing request. 504 is left out on purpose: one slow
// query timing out must not take the visitor off the site.
const UNAVAILABLE_STATUSES = [502, 503];

const FALLBACK_PAGE = "/maintenance.html";

let fallbackShown = false;

// Replace the whole document with the neutral static fallback page, at the current
// URL: a reload then simply tries the real site again. Only if that page cannot be
// fetched either, navigate to it.
const showFallbackPage = async (): Promise<void> => {
  try {
    const response = await fetch(withPrefix(FALLBACK_PAGE), { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const page = new DOMParser().parseFromString(await response.text(), "text/html");
    document.replaceChild(document.adoptNode(page.documentElement), document.documentElement);
  } catch (_) {
    window.location.replace(withPrefix(FALLBACK_PAGE));
  }
};

// Called from the API clients' response interceptor. An unreachable backend shows
// the neutral static fallback page (static/maintenance.html), the same page nginx
// and Cloudflare serve when the site itself is down.
export const reportApiError = (error: AxiosError): void => {
  if (fallbackShown || error.code === AxiosError.ERR_CANCELED) return;

  // Maintenance mode: the themed maintenance screen is already showing, and nginx
  // answers the closed proxy with a 503 marked {"maintenance": true}.
  if (window.sessionStorage.getItem("MAINTENANCE_MODE") === "true") return;
  if ((error.response?.data as { maintenance?: boolean } | undefined)?.maintenance === true) return;

  const unreachable = !error.response; // network error, DNS, CORS on a dead ingress
  if (!unreachable && !UNAVAILABLE_STATUSES.includes(error.response?.status ?? 0)) return;

  fallbackShown = true;
  void showFallbackPage();
};
