import dateFormat, { i18n } from "dateformat";
import { en as enM, nl as nlM } from "../translations/months";
import { en as enD, nl as nlD } from "../translations/days";

// Why this function exists — two separate root causes:
//
// ROOT CAUSE 1 — WebKit's strict ECMAScript compliance (affects formats 1 & 2):
//   WebKit (Apple's browser engine) follows the ECMAScript spec strictly: only ISO 8601
//   format (yyyy-mm-dd) is a valid date string. Non-standard formats like dd-mm-yyyy return
//   Invalid Date. Chrome uses its own Blink engine, which is more lenient and parses these
//   anyway — but that leniency is technically non-spec-compliant.
//
//   Who is affected by this:
//   - Safari on macOS, iOS, iPadOS (always uses WebKit)
//   - Chrome, Firefox, Edge on iOS and iPadOS — Apple's App Store rules require ALL browsers
//     on iOS/iPadOS to use WebKit as their JavaScript engine. Chrome on iOS is essentially a
//     UI wrapper around WebKit, not Google's own Blink engine. So it behaves identically to
//     Safari for date parsing purposes.
//   - Chrome on macOS uses Blink, not WebKit, and does NOT have this issue.
//   Note: since iOS/iPadOS 17.4 the EU Digital Markets Act allows non-WebKit browsers in the
//   EU, but alternative engines are not yet widely deployed.
//
// ROOT CAUSE 2 — ECMAScript spec for date-only strings (affects format 3):
//   The ECMAScript specification explicitly states that date-only ISO strings (yyyy-mm-dd)
//   without a timezone must be interpreted as UTC midnight. This is intentional and affects
//   ALL spec-compliant browsers, not just WebKit. In Amsterdam (UTC+1) or London (UTC+1 BST),
//   "2026-02-17" parsed as UTC midnight becomes Feb 16 at 23:00 local time — the wrong day.
//   We parse it manually to force local midnight instead.
//
// Supported input formats and how each is handled:
//
//   1. dd-mm-yyyy  e.g. "17-02-2026"  (European format — what we primarily send)
//      WebKit returns Invalid Date for this (non-ISO format, see Root Cause 1 above).
//      We parse the parts manually and construct the Date in local time via new Date(year, month - 1, day).
//
//   2. mm-dd-yyyy  e.g. "02-17-2026"  (American format — please don't)
//      Same regex pattern as dd-mm-yyyy, so we disambiguate by value where possible:
//        - If the first part is > 12 it must be a day  → treat as dd-mm-yyyy  e.g. "17-06-2026" → June 17th  ✓
//        - If the second part is > 12 it must be a day → treat as mm-dd-yyyy  e.g. "06-17-2026" → June 17th  ✓
//        - If both ≤ 12 (ambiguous, e.g. "01-06-2026") → we CANNOT tell if this is Jan 6th or June 1st.
//          We default to dd-mm-yyyy (June 1st) because this is a European application.
//          If you send mm-dd-yyyy with both parts ≤ 12, the date will be parsed incorrectly.
//          Solution: don't send American date formats to a European application.
//
//   3. yyyy-mm-dd  e.g. "2026-02-17"  (ISO date-only — no time component)
//      All spec-compliant browsers parse this as UTC midnight (see Root Cause 2 above).
//      In non-UTC timezones that shifts the visible date by one day. We parse manually
//      to get local midnight instead.
//
//   4. yyyy-mm-ddTHH:mm:ss+HH:mm  e.g. "2026-02-17T12:18:39+00:00"  (full ISO datetime)
//      All browsers handle full ISO 8601 datetime strings with a timezone offset correctly.
//      We pass these directly to new Date() and let the browser do the work.
//
// Output: a JavaScript Date object representing the correct date in the user's local timezone.
//
// Note: JavaScript's Date constructor uses 0-indexed months (January = 0, December = 11),
// so we subtract 1 from the month number. February (02) → 1, July (07) → 6, etc.
//
// Examples (Amsterdam timezone, UTC+1 in winter / UTC+2 in summer):
//   dd-mm-yyyy winter: "17-02-2026"              → new Date(2026, 1, 17)  → 2026-02-17T00:00:00+01:00  ✓
//   dd-mm-yyyy summer: "15-07-2026"              → new Date(2026, 6, 15)  → 2026-07-15T00:00:00+02:00  ✓
//   full ISO   winter: "2026-02-17T12:18:39+00:00" → new Date(...)        → 2026-02-17T13:18:39+01:00  ✓
//   full ISO   summer: "2026-07-15T12:18:39+00:00" → new Date(...)        → 2026-07-15T14:18:39+02:00  ✓
//
// Examples (London timezone, UTC+0 in winter / UTC+1 in summer):
//   dd-mm-yyyy winter: "17-02-2026"              → new Date(2026, 1, 17)  → 2026-02-17T00:00:00+00:00  ✓
//   dd-mm-yyyy summer: "15-07-2026"              → new Date(2026, 6, 15)  → 2026-07-15T00:00:00+01:00  ✓
//   full ISO   winter: "2026-02-17T12:18:39+00:00" → new Date(...)        → 2026-02-17T12:18:39+00:00  ✓
//   full ISO   summer: "2026-07-15T12:18:39+00:00" → new Date(...)        → 2026-07-15T13:18:39+01:00  ✓

const parseDateSafe = (date: string): Date => {
  // Format 4: full ISO datetime with time component — Safari handles these correctly
  if (date.includes("T")) {
    return new Date(date);
  }

  // Format 3: yyyy-mm-dd (ISO date-only — parse manually to avoid Safari's UTC midnight issue)
  const yyyymmdd = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (yyyymmdd) {
    return new Date(parseInt(yyyymmdd[1]), parseInt(yyyymmdd[2]) - 1, parseInt(yyyymmdd[3]));
  }

  // Formats 1 & 2: dd-mm-yyyy or mm-dd-yyyy — same pattern, disambiguated by value
  const dmyyyy = date.match(/^(\d{2})-(\d{2})-(\d{4})/);
  if (dmyyyy) {
    const [, part1, part2, year] = dmyyyy.map(Number);
    // If part1 > 12 it can only be a day (dd-mm-yyyy); if part2 > 12 it can only be a day (mm-dd-yyyy)
    const [day, month] = part1 > 12 || part2 <= 12 ? [part1, part2] : [part2, part1];
    return new Date(year, month - 1, day);
  }

  return new Date(date);
};

export const translateDate = (language: string, date: string): string => {
  const parsedDate = parseDateSafe(date);

  switch (language) {
    case "nl":
      i18n.dayNames = nlD;
      i18n.monthNames = nlM;

      return dateFormat(
        parsedDate,
        window.sessionStorage.getItem("DATE_FULL_MONTH") === "true" ? "dd mmmm yyyy" : "dd-mm-yyyy",
      );
    case "en":
      i18n.dayNames = enD;
      i18n.monthNames = enM;

      return dateFormat(
        parsedDate,
        window.sessionStorage.getItem("DATE_FULL_MONTH") === "true" ? "mmmm dd yyyy" : "mm-dd-yyyy",
      );
  }

  return dateFormat(parsedDate, "dd-mm-yyyy"); // required default return due to i18n.language being basic typed
};
