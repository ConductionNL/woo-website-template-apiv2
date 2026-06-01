# Changelog

## 2026-06-01 — Migratie naar Codeberg + lokale build/push (feat/workflow-dispatch-image-build)

Repo verhuist van GitHub (`ConductionNL`) naar Codeberg (`Conduction`). Op
Codeberg hebben we (nog) geen rechten om Forgejo Actions aan te zetten, dus de
CI-gedreven image-build vervalt. In plaats daarvan bouwen we het image lokaal en
pushen het naar Docker Hub.

### Git-remote

- `origin` omgezet naar `https://codeberg.org/Conduction/woo-website-template-apiv2.git`.
- Oude GitHub-URL bewaard als remote `github` (terugvaloptie).

### `build-and-push.sh` (nieuw)

- Bouwt service `pwa` via `docker compose build` en pusht naar
  `docker.io/conduction2022/woo-website-v2:<tag>`. Tag als argument.
- Gebruikt een **geisoleerde `DOCKER_CONFIG`** (project-lokale `.docker/`) zodat
  een login hier de persoonlijke `~/.docker/config.json` niet aanraakt.
- `CONTAINER_REGISTRY_BASE` wordt als shell-override meegegeven (wint van `.env`),
  zodat het getrackte `.env` niet bewerkt hoeft te worden.
- Auth via `DOCKERHUB_TOKEN` (stdin) of interactieve login bij eerste run.
- Conform shell-style-guide: `set -euo pipefail`, SPDX/role-header, `main "$@"`,
  shellcheck-clean.

### `.gitignore`

- `.docker/` toegevoegd (geisoleerde credentialstore — bevat tokens).
- `.env` uit git-tracking gehaald (`git rm --cached .env`); stond al in
  `.gitignore` maar werd nog getrackt voor de CI. **NB:** eerdere inhoud blijft
  in de git-historie staan — roteer secrets als die erin stonden.

### CI-workflows

- `.github/workflows/` → `.forgejo/workflows/` verplaatst (Forgejo's native
  locatie). Inert zolang Actions op Codeberg uit staat (`has_actions=false`).
- **Nieuw: `.forgejo/workflows/container.yml`** — bouwt de PWA-container met
  buildah (geen Docker daemon op Codeberg shared runners) en pusht naar de
  Codeberg-registry `codeberg.org/conduction/woo-website-v2`. Triggers +
  push-gedrag overgenomen van de oude `dockerimage.yml`: push main → `:latest`,
  push development → `:dev`, `workflow_dispatch` → override, pull_request →
  alleen bouwen. Geen `github.*`-context (op Codeberg onbetrouwbaar); creds uit
  secrets `CODEBERG_USERNAME`/`CODEBERG_TOKEN`. Vereist nog: Actions + Packages
  units aan + die secrets + `codeberg-medium` runner (10 min, krap).
- **`dockerimage.yml` verwijderd** — vervangen door `container.yml`; draaide op
  `docker compose`/ghcr.io en zou op Codeberg falen + dubbel bouwen.
- Overige verplaatste workflows (deploy/plantuml/PR-checks) blijven voorlopig
  staan; GitHub-specifieke deploy-workflows werken niet op Codeberg.
- `.github/ISSUE_TEMPLATE/bug.yml` blijft staan (door Forgejo ondersteund).

## 2026-04-30 — Platform-grade hardening (refactor/platform-grade-cleanup)

Cleanup voor gebruik als gepinde chart-dependency in `react-base`. Geen
breaking changes aan de Helm-values-API — bestaande Application-YAMLs
blijven werken zoals ze waren.

### `pwa/Dockerfile`

- **Pinned base-images**: `node:18` → `node:18.20.5-alpine3.20`, `nginx` (ongetagged → trok `:latest`) → `nginx:1.27.3-alpine`. Reproduceerbare builds.
- **`npm install` → `npm ci`**: lockfile-driven, immutable. Aparte `npm install @parcel/watcher` weggehaald (zit al in `devDependencies`).
- **`HUSKY=0`** zodat `prepare`-script geen husky probeert te installeren in container.
- **`HEALTHCHECK`** toegevoegd (busybox wget op `:8080/`).

### `pwa/.dockerignore`

- Was 1 regel (`node_modules`). Nu volledige Node/Gatsby-hygiëne: caches, logs, lint-caches, env-files, IDE, OS, docs/VCS. `patches/` expliciet WEL meegenomen (patch-package).

### `.gitignore` (repo-root)

- Was minimal + project-eigen helpers. Uitgebreid met standaard Node/Gatsby ignores: TypeScript build-info, lint-caches, OS-files, env-files (met `!.env.example` uitzondering). Bestaande project-helpers behouden.

### `helm/woo-website/Chart.yaml`

- `version: 1.0.6` → `version: 1.1.0` (chart-changes, geen breaking values-API).
- `appVersion: 1.0.0` → `appVersion: "1.0.0"` (quoted, valid YAML).
- Comment over CI-koppeling met image-tag.

### `helm/woo-website/values.yaml`

- **`pwa.image.pullPolicy`**: `Always` → `IfNotPresent` (ready voor pinned tags).
- **`serviceAccount.create`**: `false` → `true` (dedicated SA per release, least-privilege).
- **`podSecurityContext`** ingevuld: `runAsNonRoot: true`, `runAsUser/Group/fsGroup: 101` (nginx uid in alpine), `seccompProfile: RuntimeDefault`.
- **`securityContext`** ingevuld: `allowPrivilegeEscalation: false`, `capabilities.drop: [ALL]`, `runAsNonRoot: true`, expliciet uid/gid. `readOnlyRootFilesystem: false` met comment over wat ervoor moet veranderen om 't aan te zetten (entrypoint schrijft naar image-fs).
- **`resources.limits`** toegevoegd (`cpu: 500m`, `memory: 256Mi`) en `requests` opgeschoond (`cpu: 50m`, `memory: 64Mi`) — was eerder weirdly geïndenteerd YAML met alleen requests.
- **Probes** expliciet getypt (`initialDelaySeconds`, `periodSeconds`, `timeoutSeconds`, `failureThreshold`) i.p.v. K8s defaults.
- Comments toegevoegd waar de huidige defaults nog "drift-bron" zijn (`tag: "latest"`) of toekomstig refactor-onderwerp (`pwa.runtime`, theming-naar-runtime).

### `helm/woo-website/templates/deployment.yaml`

- **`automountServiceAccountToken: false`** — pod heeft geen K8s-API toegang nodig.
- **Probes templaten van `.Values.livenessProbe` / `.Values.readinessProbe`** i.p.v. hardcoded `httpGet path: /`.

### `helm/woo-website/templates/ingress.yaml`

- **Bug-fix**: produceerde drie `tls:` blokken in dezelfde Ingress-spec (twee duplicates door copy-paste, één van `global.tls`). Resultaat was technisch invalid YAML met undefined K8s-gedrag. Nu één gemerged TLS-blok dat user-provided `ingress.tls` én cert-manager-issued `<release>-frontend-tls` correct combineert.
- Annotations-blok ook opgeschoond zodat 'm niet leeg gerendert wordt.

### Verificatie

- `helm lint helm/woo-website` → clean (1 INFO-recommendation over chart-icon, niet-blokkerend).
- `helm template` met sample tenant-values → 6 resources gerenderd.
- `kubeconform -strict` over alle 6 resources → `Valid: 6, Invalid: 0, Errors: 0`.

### Niet aangepast (bewust uitgesteld)

- `.github/workflows/*` — deprecated actions, `.env`-grep, `:latest` push, geen image-signing/SBOM. Aparte sprint, raakt CI-flow.
- `.env` (committed) — per Mark: "enkel voor lokale builds". CI-decoupling vereist eerst `APP_NAME`/`APP_VERSION` uit alternatieve bron.
- `helm/woo-website/templates/config-runtime.yaml` (dead code, ConfigMap niet gemount) — laten staan als markeerpunt voor toekomstige theming-naar-runtime refactor.
- 37 remote branches / 3 oude open PRs — Mark expliciet "blijf van branches af".
- `publiccode.yaml` — outdated URL en `softwareVersion: null`. Cosmetisch.
- App-code refactor (theming → runtime.json) — grootste architectuur-fix, vergt PWA wijzigingen.
