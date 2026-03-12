import dateFormat, { i18n } from "dateformat";
import { en as enM, nl as nlM } from "../translations/months";
import { en as enD, nl as nlD } from "../translations/days";

// Safari is a delightful browser that, unlike every other modern browser, chokes on date
// strings that every other browser handles fine. This function exists solely to work around
// Safari-specific date parsing failures — other browsers do not need this.
//
// Supported input formats and how each is handled:
//
//   1. dd-mm-yyyy  e.g. "17-02-2026"  (Dutch format — what we primarily send)
//      Safari returns Invalid Date for this. We parse the parts manually and construct
//      the Date in local time via new Date(year, month - 1, day).
//
//   2. mm-dd-yyyy  e.g. "02-17-2026"  (American format — please don't)
//      Same regex pattern as dd-mm-yyyy, so we disambiguate by value where possible:
//        - If the first part is > 12 it must be a day  → treat as dd-mm-yyyy  e.g. "17-06-2026" → June 17th  ✓
//        - If the second part is > 12 it must be a day → treat as mm-dd-yyyy  e.g. "06-17-2026" → June 17th  ✓
//        - If both ≤ 12 (ambiguous, e.g. "01-06-2026") → we CANNOT tell if this is Jan 6th or June 1st.
//          We default to dd-mm-yyyy (June 1st) because this is a Dutch application.
//          If you send mm-dd-yyyy with both parts ≤ 12, the date will be parsed incorrectly.
//          Solution: don't send American date formats to a Dutch application.
//
//   3. yyyy-mm-dd  e.g. "2026-02-17"  (ISO date-only — no time component)
//      Safari technically parses this, but treats it as UTC midnight. In non-UTC timezones
//      that shifts the visible date by one day. We parse manually to get local midnight.
//
//   4. yyyy-mm-ddTHH:mm:ss+HH:mm  e.g. "2026-02-17T12:18:39+00:00"  (full ISO datetime)
//      Safari handles full ISO 8601 datetime strings correctly, including timezone offsets.
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
