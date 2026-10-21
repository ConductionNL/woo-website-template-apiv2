# Onderhoudspagina

De OpenWoo-website heeft twee pagina's voor als de website niet beschikbaar is:

1. **De onderhoudspagina in het thema** — bewust aangezet voor één organisatie met `MAINTENANCE_MODE=true`. De website toont dan op elke pagina een onderhoudspagina in de huisstijl van de organisatie, en de API-proxy wordt gesloten: er gaan geen verzoeken meer naar de backend.
2. **De neutrale statische pagina** (`pwa/static/maintenance.html`) — de terugvalpagina voor alle organisaties, voor als de website of de backend onverwacht niet bereikbaar is. Eén HTML-bestand met eigen CSS, zonder JavaScript en zonder externe bestanden, zodat hij ook werkt als niets van het platform werkt. Dezelfde pagina wordt getoond door de website zelf, door nginx en door Cloudflare.

- [De teksten](#de-teksten)
- [Onderhoudspagina in het thema aanzetten](#onderhoudspagina-in-het-thema-aanzetten)
  - [Platform-tenants (Nextcloud-base)](#platform-tenants-nextcloud-base)
  - [Kubernetes/Helm en Docker Compose](#kuberneteshelm-en-docker-compose)
  - [Domeinconfiguratie (JSON-modus)](#domeinconfiguratie-json-modus)
- [De neutrale statische pagina](#de-neutrale-statische-pagina)
  - [Wanneer verschijnt hij?](#wanneer-verschijnt-hij)
  - [Instellen in Cloudflare](#instellen-in-cloudflare)
- [Technische werking](#technische-werking)

## De teksten

Beide pagina's tonen dezelfde tekst in twee talen: eerst Nederlands, daarna Engels, elk met een eigen `lang`-attribuut (WCAG 3.1.2). Er is geen taalswitch.

De tekst volgt de storingsmeldingen van de overheid (zoals die van de Belastingdienst en het patroon [Foutpagina](https://designsystem.cibg.nl/patronen/foutpagina/) van het CIBG Design System): eerst wat er aan de hand is, dan wat de bezoeker kan doen, en de excuses als laatste. Er staat bewust geen tijdstip in en het woord "onderhoud" komt er niet in voor, omdat de statische pagina ook bij een onverwachte storing verschijnt:

- "Deze website is tijdelijk niet beschikbaar" — "We werken eraan om de website zo snel mogelijk weer beschikbaar te maken.", "Probeer het later opnieuw." en "Onze excuses voor het ongemak."
- "This website is temporarily unavailable" — "We are working to make it available again as soon as possible.", "Please try again later." and "We apologise for the inconvenience."

Beide pagina's hebben exact dezelfde tekst. Wijzig je een tekst, pas hem dan in beide pagina's aan: `pwa/static/maintenance.html` en `pwa/src/translations/nl.ts` / `en.ts`.

## Onderhoudspagina in het thema aanzetten

Bij de onderhoudspagina in het thema kun je per taal een eigen titel en tekst instellen, bijvoorbeeld om te melden wanneer de website terugkomt: `MAINTENANCE_TITLE_NL` en `MAINTENANCE_MESSAGE_NL`, en `MAINTENANCE_TITLE_EN` en `MAINTENANCE_MESSAGE_EN`. Dat is **platte tekst** en wordt getoond zoals hij is ingesteld. Zonder instelling (of met een lege waarde) wordt de standaardtekst van die taal getoond.

Alle instellingen zijn **runtime-variabelen** van de container. Bij het starten van de container schrijft het entrypoint (`pwa/docker/entrypoint.d/30-generate-runtime.sh`) ze naar `runtime.json`, en sluit het bij `MAINTENANCE_MODE=true` de API-proxy: nginx beantwoordt elk verzoek naar `/api/` zelf met `503` en `{"maintenance":true}`. Een nieuwe image-build is niet nodig; de container moet alleen opnieuw starten. Alleen de waarde `true` (kleine letters) zet de onderhoudsmodus aan.

### Platform-tenants (Nextcloud-base)

Zet de variabelen onder `tenant.frontend.env` in het tenantbestand (`nextcloud-platform/values/tenants/tenant-<naam>.yaml`). De `react-tenants`-ApplicationSet zet alles onder `frontend.env` als environment-variabele op de container:

```yaml
tenant:
  frontend:
    env:
      MAINTENANCE_MODE: "true"
      # optioneel, vervangen de standaardteksten per taal:
      MAINTENANCE_MESSAGE_NL: "We werken aan de website. Vanaf maandag 9:00 uur is de website weer bereikbaar."
      MAINTENANCE_MESSAGE_EN: "We are working on the website. It will be back on Monday at 9:00."
```

Gebruik hier de namen **zonder** `GATSBY_`-prefix. Bij tenants zonder `frontend.branding`-blok negeert Argo CD alle `GATSBY_*`-variabelen bij het synchroniseren (ze zijn daar live aanpasbaar), waardoor een `GATSBY_MAINTENANCE_MODE` uit git nooit op de pods landt. De `MAINTENANCE_*`-namen zonder prefix worden altijd vanuit git uitgerold. Gebruik geen dubbele aanhalingstekens (`"`) in de tekst: de ApplicationSet zet de waarde tussen dubbele aanhalingstekens.

Na het mergen naar `main` synchroniseert Argo CD en rolt Kubernetes de pods opnieuw uit. Uitzetten doe je door de regels weg te halen en opnieuw te mergen. De tenant moet hiervoor wel een image-versie met de onderhoudspagina draaien (`frontend.tag` vanaf `v1.1.0`).

### Kubernetes/Helm en Docker Compose

**Eigen chart-installatie** — zet dezelfde variabelen onder `pwa.env` in de values van de chart `helm/woo-website`.

**Docker Compose** — zet de variabelen in het `.env`-bestand in de root van de repository en herstart de container met `docker compose up -d`:

```dotenv
GATSBY_MAINTENANCE_MODE=true
GATSBY_MAINTENANCE_TITLE_NL=
GATSBY_MAINTENANCE_MESSAGE_NL=
GATSBY_MAINTENANCE_TITLE_EN=
GATSBY_MAINTENANCE_MESSAGE_EN=
```

Bezoekers die de website al open hebben, zien de onderhoudspagina na het verversen van de pagina.

### Domeinconfiguratie (JSON-modus)

Draait de website met `GATSBY_ENV_VARS_SET=false`, dan komt de configuratie uit de JSON-bestanden in `pwa/static/configFiles/`. Voeg dan `GATSBY_MAINTENANCE_MODE` (en eventueel de `GATSBY_MAINTENANCE_TITLE_*`- en `GATSBY_MAINTENANCE_MESSAGE_*`-teksten) toe aan het JSON-bestand van de organisatie. Daarvoor is een nieuwe build en uitrol nodig, en de API-proxy wordt in deze modus niet gesloten.

## De neutrale statische pagina

### Wanneer verschijnt hij?

De pagina staat in het image op `/maintenance.html` en verschijnt in drie situaties, zonder dat er iets ingesteld hoeft te worden:

| Situatie | Wie toont hem |
| --- | --- |
| De website laadt, maar een verzoek naar de Woo-API mislukt met `502` of `503`, of krijgt geen antwoord | De website vervangt de pagina door `maintenance.html`, op hetzelfde adres: verversen probeert de echte website opnieuw |
| nginx in de container geeft zelf een `500`, `502`, `503` of `504` (bijvoorbeeld de backend achter de proxy is uitgezet) | nginx toont de pagina met die statuscode |
| De website zelf is niet bereikbaar (pod of ingress ligt eruit) | Cloudflare, mits ingesteld (zie hieronder) |

Een `504` (time-out) van de API telt in de website bewust niet mee: één trage zoekopdracht mag de bezoeker niet van de website sturen. De `503` van de onderhoudsmodus (met `{"maintenance":true}`) ook niet: dan blijft de onderhoudspagina in het thema staan.

### Instellen in Cloudflare

Als de website zelf niet bereikbaar is, kan alleen Cloudflare nog iets tonen. Dat werkt met een **Custom Error Rule** die een **Custom Error Asset** serveert (zie de Cloudflare-documentatie over [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/)). Voorwaarden: een betaald Cloudflare-abonnement (Pro of hoger) en een DNS-record dat via Cloudflare is geproxied (oranje wolkje).

1. **Asset aanmaken** — maak een Custom Error Asset van `maintenance.html`. Cloudflare haalt het bestand eenmalig op van een openbare URL en bewaart een eigen kopie, bijvoorbeeld van een draaiende website: `https://open.openwoo.app/maintenance.html`. Omdat de pagina geen externe bestanden gebruikt, is die kopie volledig.
2. **Regel aanmaken** — maak een Custom Error Rule die het asset serveert bij serverfouten, behalve voor de API:

   ```text
   http.response.code in {500 502 503 504 520 521 522 523 524 525 526}
   and not starts_with(http.request.uri.path, "/api/")
   ```

   Sluit `/api/` uit: de website moet de echte API-antwoorden zien (zoals de `503` met `{"maintenance":true}` van de onderhoudsmodus) en handelt API-fouten zelf af.
3. **Bijwerken** — het asset is een kopie. Wijzig je de tekst in `maintenance.html`, ververs het asset dan in Cloudflare.

De regel kan per zone (domein) of op accountniveau worden ingesteld; met één regel op accountniveau geldt de pagina voor alle websites in dat account.

## Technische werking

| Stap | Bestand |
| --- | --- |
| Runtime-environment naar `runtime.json` en sluiten van de proxy | `pwa/docker/entrypoint.d/30-generate-runtime.sh`, `pwa/docker/runtime.json.template`, `pwa/docker/default.conf.template` |
| Waarden naar sessionStorage (`MAINTENANCE_MODE`, `MAINTENANCE_TITLE_NL`/`_EN`, `MAINTENANCE_MESSAGE_NL`/`_EN`) | `pwa/src/hooks/useEnvironment.ts` (env, JSON-config en `runtime.json`) |
| Keuze tussen website en onderhoudspagina in het thema | `pwa/src/hooks/useMaintenance.ts`, `pwa/src/layout/Layout.tsx` |
| Onderhoudspagina in het thema | `pwa/src/components/maintenanceScreen/MaintenanceScreen.tsx`, teksten in `pwa/src/translations/nl.ts` en `en.ts` |
| Statische pagina tonen bij een onbereikbare API | `pwa/src/services/apiAvailability.ts`, aangeroepen vanuit `pwa/src/apiService/apiService.ts` |
| Neutrale statische pagina (ook nginx-foutpagina) | `pwa/static/maintenance.html`, `pwa/docker/default.conf.template` (`error_page`) |
