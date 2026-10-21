/**
 * True when maintenance mode is switched on in the configuration (MAINTENANCE_MODE):
 * the themed maintenance screen then replaces the site. An unreachable backend is not
 * handled here; that sends the visitor to the neutral static fallback page instead
 * (see services/apiAvailability.ts).
 */
export const useMaintenance = (): boolean =>
  typeof window !== "undefined" && window.sessionStorage.getItem("MAINTENANCE_MODE") === "true";
