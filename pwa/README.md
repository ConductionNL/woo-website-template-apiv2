## PWA Quickstart

Deze PWA is een statische Gatsby-site die data ophaalt uit een OpenWoo/OpenCatalogi API. Configuratie kan via JSON-bestanden of via Gatsby-omgevingsvariabelen.

### 1) Lokaal draaien (Node, zonder Docker)
```
cd pwa
npm ci
npm run dev
```
Ga naar `http://localhost:8000`.

Standaard gebruikt de PWA JSON-configs op basis van je hostnaam/domein:
- Pad: `pwa/static/configFiles/`
- Selectie: via `getConfig()` afhankelijk van host/themanaam.

Wil je env-mode forceren (ipv JSON)? Maak `pwa/static/.env.development` aan:
```
GATSBY_ENV_VARS_SET=true
GATSBY_API_BASE_URL=https://jouw-api.example.com
GATSBY_NL_DESIGN_THEME_CLASSNAME=conduction-theme
GATSBY_DEV_ENVIRONMENT=true
# Optioneel: expliciet proxy-doel voor /api tijdens gatsby develop
# DEV_PROXY_TARGET=https://jouw-api.example.com
```

Dev proxy (CORS-vrij): tijdens `gatsby develop` wordt `/api` automatisch geproxied naar `DEV_PROXY_TARGET` (of naar `GATSBY_API_BASE_URL` als `DEV_PROXY_TARGET` leeg is). Laat `GATSBY_API_BASE_URL` niet op `/api` staan in Node-dev.

### 2) Lokaal draaien met Docker Compose
Maak in de repo-root een `.env` (voor Compose) met ten minste:
```
GATSBY_API_BASE_URL=https://jouw-api.example.com
GATSBY_NL_DESIGN_THEME_CLASSNAME=conduction-theme
CONTAINER_REGISTRY_BASE=local
CONTAINER_PROJECT_NAME=woo-website
APP_BUILD=dev
```
Start:
```
docker compose up --build
```
Ga naar `http://localhost:8000`.

Opmerking:
- Compose geeft Gatsby-variabelen door als build-args; `pwa/static/.env.production` is dan niet nodig.
- De frontend gebruikt `sessionStorage.API_BASE_URL` als die is gezet; anders valt hij terug op `/api`, dat door NGINX wordt geproxied (zie `pwa/docker/default.conf`).
 - In Compose/Container is CORS geen issue omdat NGINX `/api` naar de upstream routeert.

### JSON-configs
- Locatie: `pwa/static/configFiles/`
- Worden gekozen door `pwa/src/services/getConfig.ts` op basis van (sub)domein/themanaam.
- Handig wanneer je meerdere thema's/domeinen wil bedienen zonder rebuild.

### Env-variabelen (alleen nodig als je env-mode wil)
Minimaal:
```
GATSBY_ENV_VARS_SET=true
GATSBY_API_BASE_URL=...
GATSBY_NL_DESIGN_THEME_CLASSNAME=conduction-theme
```
Overige optionele velden (favicon, footer, security.txt, etc.) kun je later toevoegen indien gewenst.

