# CLAUDE.md

Guidance for AI assistants working in this repository.

## Commit messages (MANDATORY)

Every commit message MUST follow [Conventional Commits](https://www.conventionalcommits.org) —
commit types drive **automated semantic versioning** of the Docker images
(semantic-release; see `VERSIONING-PLAN-v3.md`). A wrong type silently produces
a wrong or missing version bump.

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
- PR titles follow the same convention: feature/hotfix PRs are squash-merged,
  so the PR title becomes the commit that semantic-release reads.

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
- Full design, history and rationale: `VERSIONING-PLAN-v3.md`.
