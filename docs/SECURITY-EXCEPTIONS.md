# Accepted security exceptions

Known, deliberately accepted `npm audit` findings. Re-evaluate on every major
release and whenever one of the listed conditions changes.

## 1. `file-type` ≤ 21.3.0 via `gatsby-core-utils` (17 moderate findings)

- **Advisory:** [GHSA-5v7r-6r5c-r473](https://github.com/advisories/GHSA-5v7r-6r5c-r473) —
  infinite loop in the ASF parser on malformed input.
- **Chain:** `gatsby@5` → `gatsby-core-utils` → `file-type@^16.5.4`, plus the `gatsby-*` satellites, `@conduction/components` and `gatsby-plugin-breadcrumb` that depend on the same chain. All 17 audit entries share this one root cause.
- **Why not fixed:** the fix requires `file-type` ≥ 21.3.1, which is ESM-only
  (since v17). `gatsby-core-utils` loads it with a CommonJS
  `require("file-type")`, so pinning the fixed version through `overrides`
  breaks every build with `ERR_REQUIRE_ESM`. There is no 16.x backport, and
  Gatsby 5 is in minimal-maintenance mode upstream.
- **Why acceptable:** the vulnerable code runs at build time only, and only
  when Gatsby downloads remote files (`fetchRemoteFile` /
  `createRemoteFileNode`). This site sources no remote files at build — all
  API data is fetched client-side at runtime. Worst case is a hung CI build,
  never a user-facing issue.
- **Re-evaluate when:** Gatsby ships a `gatsby-core-utils` on modern
  `file-type`, the project moves off Gatsby, or the build starts sourcing
  remote files.

## 2. `decode-uri-component` ≤ 0.4.2 via `query-string` (2 moderate findings)

- **Advisory:** [GHSA-vcc3-ghjq-m6fr](https://github.com/advisories/GHSA-vcc3-ghjq-m6fr) — denial of service via exponential decoding of malformed percent-encoded input.
- **Chain:** `gatsby@5` → `query-string@^6` → `decode-uri-component@^0.2`. The `gatsby` entry and its dependents are already counted under section 1; this adds only the `query-string` and `decode-uri-component` entries.
- **Why not fixed:** the fix requires `decode-uri-component` 0.5.0, which is ESM-only. `query-string@6` loads it with a CommonJS `require()` and calls the result directly, which fails with `TypeError: decodeComponent is not a function`, since `require()` of the ESM module returns `{ default }`. Overriding `query-string` instead doesn't help either: every release that pulls in a fixed `decode-uri-component` is ESM-only as well.
- **Why acceptable:** Gatsby imports `query-string` only in its development-mode 404 page (`internal-plugins/dev-404-page`). It is not part of the production bundle, so it only runs on a local `gatsby develop` server.
- **Re-evaluate when:** Gatsby moves to a newer `query-string`, or the project moves off Gatsby.

## 3. `showdown` 2.1.0 (3 moderate findings)

- **Advisories:**
  [GHSA-cr32-g25g-vxjj](https://github.com/advisories/GHSA-cr32-g25g-vxjj)
  (XSS via metadata titles),
  [GHSA-22g5-r2x5-97cx](https://github.com/advisories/GHSA-22g5-r2x5-97cx)
  (stored XSS via table header IDs),
  [GHSA-rmmh-p597-ppvv](https://github.com/advisories/GHSA-rmmh-p597-ppvv)
  (ReDoS in link parsing).
- **Why not fixed:** showdown is unmaintained; no fixed release exists.
- **Why acceptable:** both XSS advisories are neutralized — every byte of
  showdown output passes through DOMPurify (`sanitizeHtml()`) before being
  rendered (`ParsedHTML.tsx`). The remaining ReDoS requires malicious
  markdown in the municipality's own configured docs repository and at worst
  slows down that docs page in the visitor's browser.
- **Planned fix:** replace showdown with a maintained GitHub-flavored
  markdown parser (`marked` or `markdown-it`) in a post-1.0.0 release, which
  removes these three findings entirely.
