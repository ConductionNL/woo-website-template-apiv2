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

## PR titles & descriptions (MANDATORY for titles)

When writing or suggesting a pull request:

- **Title = a Conventional Commit, and it decides the version.** Feature/hotfix
  PRs are squash-merged, so the PR title becomes the commit that
  semantic-release reads. Choose the type by what the change does to the
  shipped Docker image: `fix:` → patch, `feat:` → minor, workflow/docs-only
  work → `ci:`/`docs:` (no release). Enforced by `pr-lint.yml` — a wrong
  title blocks the merge.
- **Breaking changes: mark them in the title** with `!` (`feat!: …` or
  `fix!: …`). Do not rely on a `BREAKING CHANGE:` footer hidden in the
  description — the title is the reliable part of the squash commit.
- **Exempt PRs** (merge-committed, title never enters history — pr-lint skips
  the title check for these): `development → beta`, `beta → main`, and the
  automated `backmerge/*` PRs. Their titles may be descriptive
  ("Release v1.2.0"); never squash-merge them.
- **Description is free-form** (no lint) and has no version effect. Include:
  what changed and why, how it was tested, and any manual steps. For PRs into
  `development`, note the expected version effect of the title (e.g. "`fix:`
  → will release a patch prerelease on merge").

## Branch flow & merge methods

`development` → `beta` → `main` (enforced by
`.github/workflows/pull-request-from-branch-check.yaml`; `hotfix/*` may PR
directly to `main`). `beta` is a pass-through required by org branch
protections — it gets no tags, releases, or images.

| PR | Merge method |
|---|---|
| feature/fix branch → `development` | **Squash** |
| `hotfix/*` → `main` | **Squash** |
| `development` → `beta`, `beta` → `main` | **Merge commit — never squash, never rebase** |
| back-merge `main` → `development` (after each stable release) | **Merge commit — never squash** |

Squashing a promotion or back-merge PR collapses the release history into one
commit: the version bump would then be decided by that single title, and
development would lose the release tags it needs to compute correct prerelease
versions.

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
