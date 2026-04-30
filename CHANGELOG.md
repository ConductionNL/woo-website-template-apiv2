# Changelog

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
