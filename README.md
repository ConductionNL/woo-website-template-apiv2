## Woo PWA — lokale setup en omgevingsvariabelen

Deze repo bevat een statische Gatsby PWA in `pwa/` die data ophaalt uit een achterliggende OpenWoo/OpenCatalogi API. Er is lokaal geen Redis/auth/etc. nodig.

- De PWA kan configureren via JSON-bestanden in `pwa/static/configFiles/` (per domein/thema)
- Of via Gatsby-omgevingsvariabelen (bij build-time)

Zie ook de quickstart met voorbeelden in `pwa/README.md`.

Helm-deploy? Zie `helm/woo-website/README.md` voor installatie en waarden.

### Versionering & releases

Dit project gebruikt automatische semantische versionering op basis van
Conventional Commits — het commit-type bepaalt de versie-bump (`fix:` → patch,
`feat:` → minor, breaking change → major). Zie `docs/CONTRIBUTING.md` voor de
volledige werkwijze en de merge-regels per branch.

- Merge naar `development` → prerelease `vX.Y.Z-development.N` (git-tag,
  GitHub pre-release én Docker-image)
- Merge naar `main` (via `beta`) → stabiele release `vX.Y.Z` met changelog

Docker-images staan op `ghcr.io/conductionnl/woo-website-v2`:

| Image-tag | Betekenis |
|---|---|
| `sha-<volledige commit-sha>` | Onveranderlijk anker per commit — deployments pinnen hierop of op een versietag |
| `vX.Y.Z` | Stabiele release (main) |
| `vX.Y.Z-development.N` | Ontwikkel-iteratie N richting versie X.Y.Z |
| `main` / `development` | **Bewegende** branch-pointers — alleen voor lokaal gemak |

Pin een omgeving (ook test/acceptatie) altijd op een **volledige versietag of
sha-tag**, nooit op `development` of `main`: bewegende pointers veranderen bij
elke merge, waardoor een herstart van de omgeving ongemerkt een nieuwere
(mogelijk kapotte) build binnenhaalt. Versietags en sha-tags worden nooit
overschreven — wat je pint, blijft wat er draait.

### Snel starten (Node, zonder Docker)
1. Ga naar de PWA-map: `cd pwa`
2. Installeer dependencies: `npm ci` (of `npm install`)
3. Start lokaal: `npm run dev`
4. Bezoek: `http://localhost:8000`

Let op: de `localhost.json` zet `GATSBY_API_BASE_URL` op `/api` (handig in Docker met NGINX-proxy). In pure Node dev is er geen proxy, dus kies één van deze opties:
- Zet env-mode aan met acceptatie-API: maak `pwa/static/.env.development` en zet `GATSBY_DEV_ENVIRONMENT=true` (zie voorbeeld hieronder)
- Of wijzig `pwa/static/configFiles/other/localhost/localhost.json` zodat `GATSBY_API_BASE_URL` een absolute URL is

Wil je env-variabelen gebruiken? Maak `pwa/static/.env.development` aan met minimaal:

```
GATSBY_ENV_VARS_SET=true
GATSBY_DEV_ENVIRONMENT=true
GATSBY_API_BASE_URL=https://jouw-api.example.com
GATSBY_NL_DESIGN_THEME_CLASSNAME=conduction-theme
```

### Snel starten (Docker Compose)
1. Maak in de repo-root een `.env` met minimaal:

```
# Compose build args → gaan de container build in als Gatsby env
GATSBY_API_BASE_URL=https://jouw-api.example.com
GATSBY_NL_DESIGN_THEME_CLASSNAME=conduction-theme

# Image tag/name (lokale waarden zijn prima)
CONTAINER_REGISTRY_BASE=local
CONTAINER_PROJECT_NAME=woo-website
APP_BUILD=dev

# Optioneel: CSP connect-src overrides (env-gestuurd i.p.v. hardcoded lijsten)
# Volledige vervanging van connect-src (spatie-gescheiden):
# GATSBY_CSP_CONNECT_SRC_FULL='https://api.example.com https://raw.githubusercontent.com/ConductionNL/'
# Extra hosts toevoegen (aan bestaande lijst):
# GATSBY_CSP_CONNECT_SRC_EXTRA='https://extra1.example.com https://extra2.example.com'
```

2. Start: `docker compose up --build`
3. Bezoek: `http://localhost:8000`

Opmerking:
- Compose geeft de Gatsby-variabelen mee als build-args; je hebt dan geen `pwa/static/.env.production` nodig.
- De NGINX-proxy voor `/api` staat in `pwa/docker/default.conf`. De frontend gebruikt óf `API_BASE_URL` uit sessionStorage (gezet via Gatsby env/JSON-config) óf valt terug op `/api`.

### Waar komen variabelen vandaan?
- Node dev: `pwa/static/.env.development` (optioneel). Als `GATSBY_ENV_VARS_SET` niet "true" is, gebruikt de app JSON-config uit `pwa/static/configFiles/`.
- Productie build: `pwa/static/.env.production` of build-args tijdens Docker build (via Compose `.env` in de repo-root).
- Docker Compose: `.env` in de repo-root wordt automatisch ingelezen door Compose en levert de build-args in `docker-compose.yml`.

### Minimale variabelen (alleen als je env-mode wil gebruiken)
- `GATSBY_ENV_VARS_SET` = `true` om env-mode te forceren (anders JSON-config)
- `GATSBY_API_BASE_URL` = jouw backend API-base URL
- `GATSBY_NL_DESIGN_THEME_CLASSNAME` = CSS theme class (bijv. `conduction-theme`)

Alle overige optionele UI-waarden en security.txt-velden zijn te vinden in de code en kunnen desgewenst worden toegevoegd, maar zijn niet nodig voor een basis-run.