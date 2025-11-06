## Environment variables index

### Quick tables

Build-time (Gatsby) – baked into the site at build

| Name                             | Where set              | Consumed by | When  | Effect/Notes                                                                                 |
| -------------------------------- | ---------------------- | ----------- | ----- | -------------------------------------------------------------------------------------------- |
| GATSBY_ENV_VARS_SET              | Compose build args, CI | Gatsby code | build | true = use env-only, false = use JSON configs by hostname                                    |
| GATSBY_API_BASE_URL              | Compose build args, CI | Gatsby code | build | If non-empty, frontend calls this URL directly (no proxy). Leave empty to force `/api` proxy |
| GATSBY_DEV_ENVIRONMENT           | Compose build args     | Gatsby code | build | Local dev helper; keep false in prod images                                                  |
| GATSBY_NL_DESIGN_THEME_CLASSNAME | Compose build args     | UI          | build | Theme class (e.g. `conduction-theme`)                                                        |
| GATSBY_SHOW_THEME_SWITCHER       | Compose build args     | UI          | build | If true, shows theme switcher                                                                |
| GATSBY_CSP_CONNECT_SRC_FULL      | Compose build args     | Head.tsx    | build | Replace connect-src CSP (space-separated hosts)                                              |
| GATSBY_CSP_CONNECT_SRC_EXTRA     | Compose build args     | Head.tsx    | build | Append hosts to connect-src CSP                                                              |

Runtime (NGINX proxy) – can change without rebuild

| Name          | Where set                | Consumed by    | When    | Effect/Notes                           |
| ------------- | ------------------------ | -------------- | ------- | -------------------------------------- |
| UPSTREAM_HOST | Compose env, Helm values | NGINX template | runtime | Sets Host header for upstream          |
| UPSTREAM_BASE | Compose env, Helm values | NGINX template | runtime | Target base for proxy_pass of `/api/*` |

Helm values mapping

| Helm value                      | Becomes env     | Used by         |
| ------------------------------- | --------------- | --------------- |
| pwa.image.image / pwa.image.tag | container image | cluster deploy  |
| pwa.upstream.host               | UPSTREAM_HOST   | NGINX proxy     |
| pwa.upstream.base               | UPSTREAM_BASE   | NGINX proxy     |
| global.domain, ingress.\*       | ingress routing | cluster ingress |

Compose root `.env` mapping

| Root .env key                                                | Role                          |
| ------------------------------------------------------------ | ----------------------------- |
| GATSBY\_\*                                                   | Build args → baked into site  |
| UPSTREAM_HOST / UPSTREAM_BASE                                | Runtime env for proxy         |
| CONTAINER_REGISTRY_BASE / CONTAINER_PROJECT_NAME / APP_BUILD | Local image naming (optional) |

Browser sessionStorage keys (debug/testing)

| Key                       | Effect                                                  |
| ------------------------- | ------------------------------------------------------- |
| API_BASE_URL              | If non-empty, bypasses proxy and calls backend directly |
| SHOW_THEME_SWITCHER       | Toggle theme switcher visibility                        |
| NL_DESIGN_THEME_CLASSNAME | Active theme class on document/body                     |

One place to find all variables and where they apply. This project has two kinds of configuration:

- Build-time (Gatsby) variables: baked into the static site at build time. All Gatsby runtime code reads only these.
- Runtime (NGINX proxy) variables: the container proxies `/api/*` to a backend. These can be changed at runtime without rebuilding.

### Precedence (how config is chosen)

1. If `GATSBY_ENV_VARS_SET == "true"` at build time, the app uses only the baked Gatsby variables and ignores JSON configs.
2. Otherwise, the app uses JSON configs in `pwa/static/configFiles/` selected by hostname; values are copied into `sessionStorage` on page load.
3. API base decision at runtime in the browser:
   - If `sessionStorage.API_BASE_URL` is a non-empty URL, requests go directly to that URL (CORS required on backend).
   - Otherwise, requests go to the NGINX proxy at `/api`, which forwards to the configured upstream (`UPSTREAM_*`).

---

### Build-time (Gatsby) variables

Where: provided as Docker build args in `docker-compose.yml` (or your CI) and consumed in `pwa/Dockerfile`.

- `GATSBY_ENV_VARS_SET` ("true" | "false")
  - Enables env-mode (true) vs JSON-config mode (false). Default: true in our images.
- `GATSBY_API_BASE_URL` (string | empty)
  - If set (non-empty), the frontend will use this URL directly (no proxy). Leave empty to force proxy `/api`.
- `GATSBY_DEV_ENVIRONMENT` ("true" | "false")
  - Dev shortcut in code: if true, sets API to an accept URL for local dev. Keep false in production images.
- `GATSBY_NL_DESIGN_THEME_CLASSNAME` (string)
  - CSS class for theme (e.g. `conduction-theme`).
- `GATSBY_SHOW_THEME_SWITCHER` ("true" | "false")
  - Optional. If true, shows theme switcher in UI.
- `GATSBY_CSP_CONNECT_SRC_FULL` (space-separated URLs)
  - Optional. Replaces connect-src CSP entirely.
- `GATSBY_CSP_CONNECT_SRC_EXTRA` (space-separated URLs)
  - Optional. Appends extra hosts to connect-src CSP.

Where defined:

- Compose/CI as build args → `pwa/Dockerfile` `ARG ...` → baked with `ENV` → `gatsby build`.
- For local Node dev only: `pwa/static/.env.development` (and `.env.production` if you build locally with Node).

---

### Runtime (NGINX proxy) variables

Where: container env at runtime (Compose/Helm), rendered into `/etc/nginx/conf.d/default.conf` from `pwa/docker/default.conf.template`.

- `UPSTREAM_HOST` (string)
  - The `Host` header to pass upstream, e.g. `softwarecatalogus.test.commonground.nu`.
- `UPSTREAM_BASE` (URL)
  - The upstream base URL for proxying `/api/*`, e.g. `https://…/apps/opencatalogi/api`.

Where defined:

- Compose: in root `.env` → `docker-compose.yml` → `environment` of service.
- Helm: `values.yaml` `pwa.upstream.host` and `pwa.upstream.base` → Deployment env.

---

### Root .env (Docker Compose)

File: `.env` (repo root). Used by Compose for both build args and runtime env.

- Build args into Gatsby (baked):
  - `GATSBY_API_BASE_URL`, `GATSBY_ENV_VARS_SET`, `GATSBY_DEV_ENVIRONMENT`, `GATSBY_NL_DESIGN_THEME_CLASSNAME`, optional CSP vars
- Runtime proxy env:
  - `UPSTREAM_HOST`, `UPSTREAM_BASE`
- Image naming/tag for local builds (optional):
  - `CONTAINER_REGISTRY_BASE`, `CONTAINER_PROJECT_NAME`, `APP_BUILD`

---

### Helm values (Kubernetes)

File: `helm/woo-website/values.yaml` (overridden via Argo CD UI or a values file).

- `pwa.image.image` (default `ghcr.io/conductionnl/woo-website-v2`)
- `pwa.image.tag` (e.g. `helm`, `helm-proxy`, or your version)
- `pwa.upstream.host` → env `UPSTREAM_HOST`
- `pwa.upstream.base` → env `UPSTREAM_BASE`
- `global.domain`, `ingress.*` for ingress/host routing

Note: Argo/Helm does not rebuild images. To change build-time Gatsby variables, build and push a new tag, then set `pwa.image.tag` and sync.

---

### Local Node dev

File: `pwa/static/.env.development`

Minimum useful set to use env-mode with dev proxy:

```
GATSBY_ENV_VARS_SET=true
GATSBY_DEV_ENVIRONMENT=true
GATSBY_API_BASE_URL=https://opencatalogi.accept.commonground.nu/apps/opencatalogi/api
GATSBY_NL_DESIGN_THEME_CLASSNAME=conduction-theme
# DEV_PROXY_TARGET=https://… (optional; dev-only proxy for gatsby develop)
```

Dev proxy: during `gatsby develop`, `/api/*` is proxied to `DEV_PROXY_TARGET` (or `GATSBY_API_BASE_URL` when set) to avoid CORS.

---

### SessionStorage keys (set by app at runtime)

These are not env vars, but the app uses them to drive UI and API base. Useful for quick testing in the browser console.

- `API_BASE_URL` (string)
  - If non-empty, the frontend bypasses `/api` and calls the backend directly.
- `SHOW_THEME_SWITCHER` ("true" | "false"), `NL_DESIGN_THEME_CLASSNAME`, `ORGANISATION_NAME`, etc.

Example toggle to force proxy:

```js
window.sessionStorage.removeItem("API_BASE_URL");
location.reload();
```

---

### Recommended combinations

- Proxy mode (recommended in clusters):

  - Build-time: `GATSBY_API_BASE_URL` blank
  - Runtime: set `UPSTREAM_HOST`/`UPSTREAM_BASE`
  - Browser will call `/api/*`, NGINX forwards to upstream

- Direct mode (only when CORS is enabled on backend):
  - Build-time: set `GATSBY_API_BASE_URL` to backend URL
  - Runtime: `UPSTREAM_*` unused by the app (only `/api` calls would use it)
