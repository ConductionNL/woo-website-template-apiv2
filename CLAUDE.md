# CLAUDE.md

Guidance for AI assistants working in this repository.

## Commit messages (MANDATORY)

Every commit message MUST follow [Conventional Commits](https://www.conventionalcommits.org) —
commit types drive **automated semantic versioning** of the Docker images
(semantic-release via `.github/workflows/release.yml`; convention documented in
`docs/CONTRIBUTING.md`). A wrong type silently produces a wrong or missing
version bump.

Format: `type(scope)?: description`

| Type | Version effect |
|---|---|
| `fix:` | patch (`1.0.0` → `1.0.1`) |
| `feat:` | minor (`1.0.0` → `1.1.0`) |
| `feat!:` or a `BREAKING CHANGE:` footer | major (`1.0.0` → `2.0.0`) |
| `build:` `chore:` `ci:` `docs:` `perf:` `refactor:` `revert:` `style:` `test:` | no release |

Rules:

- `hotfix:` is **NOT** a valid type. Hotfix *branches* are named `hotfix/*`,
  but their commits and PR titles use `fix:`.
- When asked to write, suggest, or make a commit: always produce a message in
  this format. If the user supplies a non-conforming message, point it out and
  propose the corrected form.
- Never bypass the `.husky/commit-msg` hook (`--no-verify`) — CI re-checks
  every PR anyway (`.github/workflows/pr-lint.yml`).
- **Every branch commit enters history and counts** (all PRs are merged with
  merge commits — no squash). Use `fix:`/`feat:` only on commits that really
  contain that kind of change; intermediate and cleanup work is
  `chore:`/`refactor:`/`docs:`. Every `fix:`/`feat:` commit also becomes a
  line in the release changelog. Mark breaking changes in the commit itself
  (`feat!:` or a `BREAKING CHANGE:` footer).

## PR titles & descriptions

When writing or suggesting a pull request:

- **The version is decided by the branch commits, not the title** (merge-commit
  merging: the title never becomes a commit). semantic-release takes the
  highest bump across the newly merged commits — one release per merge, not
  one per commit.
- **Title: still a Conventional Commit** — enforced by `pr-lint.yml`, for a
  readable PR overview. Exempt (title check skipped): `development → beta`,
  `beta → main`, and the automated `backmerge/*` PRs; their titles may be
  descriptive ("Release v1.2.0").
- **Description: only the commits being merged.** Describe what this PR
  changes and why — nothing else. No test plans, no review notes, no side
  findings, no follow-ups for other repos, no version-effect explanations.
  Anything discovered *while* doing the work but not *part of* the change
  goes to the requester in chat or into a separate issue.

## Branch flow & merge methods

`development` → `beta` → `main` (enforced by
`.github/workflows/pull-request-from-branch-check.yaml`; `hotfix/*` may PR
directly to `main`). `beta` is a pass-through required by org branch
protections — it gets no tags, releases, or images.

**Every PR is merged with a MERGE COMMIT** — feature branches, hotfixes,
promotions and back-merges alike. Never squash, never rebase-merge:

- Squashing a promotion or back-merge collapses the release history into one
  commit — the version would be decided by a single title, and development
  would lose the release tags it needs for correct prerelease versions.
- Rebase-merging rewrites commit SHAs, breaking the `sha-<sha>` image-tag
  anchors.
- Merge commits themselves ("Merge pull request …") are harmless: commitlint
  and semantic-release both ignore them.

## Versioning (context)

- Versions come from **git tags** created by semantic-release
  (`.github/workflows/release.yml`) — not from `package.json` and not from
  `APP_VERSION` in `.env` (legacy, kept only for the disabled Codeberg
  release job).
- `development` gets prerelease versions `vX.Y.Z-development.N`; `main` gets
  stable `vX.Y.Z`. Deployments pin on the immutable `sha-<full-sha>` image
  tags, never on moving pointers.
- Design rationale lives in the workflow headers themselves
  (`.github/workflows/release.yml` and `.github/workflows/dockerimage.yml`)
  and in `docs/CONTRIBUTING.md`.
