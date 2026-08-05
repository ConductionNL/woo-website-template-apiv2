// Commit-message rules: Conventional Commits (https://www.conventionalcommits.org).
// Commit types drive automated semantic versioning (see docs/CONTRIBUTING.md):
//   fix: -> patch, feat: -> minor, feat!:/BREAKING CHANGE -> major.
// NB `hotfix:` is not a type — hotfix branches are named hotfix/*, their
// commits use `fix:`. This file lives in pwa/ (not the repo root) so that
// `extends` resolves against pwa/node_modules; the commit-msg hook and the
// CI job both pass `--config pwa/commitlint.config.js`.
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Shown as the "Get help" link in every commitlint error — point people at
  // our own docs (type table, examples, why) instead of the generic upstream
  // README.
  helpUrl:
    "https://github.com/ConductionNL/woo-website-template-apiv2/blob/main/docs/CONTRIBUTING.md#commit-berichten-conventional-commits-verplicht",
};
