# Websitebrede melding

Met de instelling `GATSBY_NOTIFICATION_MESSAGE` toont de OpenWoo-website een melding bovenaan elke pagina, bijvoorbeeld bij een storing of tijdelijke technische problemen. Elke organisatie die de website draait stelt de melding zelf in; zonder instelling (of met een lege waarde) wordt er niets getoond.

- [Hoe de melding eruitziet en werkt](#hoe-de-melding-eruitziet-en-werkt)
- [Instellen, wijzigen en verwijderen](#instellen-wijzigen-en-verwijderen)
  - [Docker-image (Kubernetes/Helm, Docker Compose)](#docker-image-kuberneteshelm-docker-compose)
  - [GitHub Pages (serverless)](#github-pages-serverless)
  - [Domeinconfiguratie (JSON-modus)](#domeinconfiguratie-json-modus)
- [Wanneer zien bezoekers een wijziging?](#wanneer-zien-bezoekers-een-wijziging)
- [Technische werking](#technische-werking)

## Hoe de melding eruitziet en werkt

- De melding verschijnt als waarschuwingsbalk (NL Design System Alert, type `warning`) boven de header, op elke pagina van de website. De kleuren komen uit het thema van de organisatie.
- De tekst is **platte tekst**. HTML of Markdown wordt niet geïnterpreteerd; e-mailadressen en URL's (`https://…`) in de tekst worden automatisch klikbare links (e-mailadressen als `mailto:`-link).
- Bezoekers kunnen de melding sluiten met de sluitknop. Dat wordt onthouden zolang het browsertabblad open is (sessionStorage); in een nieuw tabblad of een nieuwe browsersessie verschijnt de melding opnieuw.
- Wordt de tekst gewijzigd, dan verschijnt de melding ook opnieuw voor bezoekers die de vorige tekst al hadden gesloten.
- Toegankelijkheid: de melding is voor schermlezers vindbaar als regio "Melding" en de sluitknop heet "Melding sluiten". De melding wordt niet bij elke pagina actief voorgelezen (`role="status"` in plaats van `alert`). Voor toetsenbordgebruikers is de sluitknop het eerste element, vóór de skiplinks.
- De tekst wordt **niet vertaald** door de NL/EN-taalswitch, net als de jumbotron-teksten. Combineer zo nodig met `GATSBY_HIDE_LANGUAGE_SWITCH` (zie [Installatie](./Installatie.md#configuratie), WCAG 3.1.2).

## Instellen, wijzigen en verwijderen

Hoe je de melding instelt hangt af van hoe de website is uitgerold. Het belangrijkste verschil: bij het Docker-image is er **geen nieuwe build** nodig, bij GitHub Pages en de domeinconfiguratie wel.

### Docker-image (Kubernetes/Helm, Docker Compose)

Bij het Docker-image is de melding een **runtime-variabele**: je zet `GATSBY_NOTIFICATION_MESSAGE` als environment-variabele van de container. Bij het starten van de container schrijft het entrypoint (`pwa/docker/entrypoint.d/30-generate-runtime.sh`) de waarde naar `runtime.json`, dat de website bij elke paginalading ophaalt. Een nieuwe image-build is dus niet nodig; de container moet alleen opnieuw starten, want de environment wordt alleen bij het starten gelezen.

**Kubernetes/Helm** — zet de variabele onder `pwa.env` in de values (bijvoorbeeld via Argo CD):

```yaml
pwa:
  env:
    GATSBY_NOTIFICATION_MESSAGE: "We ervaren momenteel technische problemen. Mail naar gemeente@voorbeeld.nl voor hulp."
```

Na het synchroniseren rolt Kubernetes de pods automatisch opnieuw uit, omdat de pod-specificatie is gewijzigd. Om de melding te verwijderen, haal je de regel weg of maak je de waarde leeg en synchroniseer je opnieuw.

**Docker Compose** — zet de variabele in het `.env`-bestand in de root van de repository en herstart de container met `docker compose up -d` (Compose maakt de container opnieuw aan als de environment is gewijzigd):

```dotenv
GATSBY_NOTIFICATION_MESSAGE=We ervaren momenteel technische problemen. Mail naar gemeente@voorbeeld.nl voor hulp.
```

> **Let op**
> Bij het Docker-image telt alleen de runtime-waarde. Het entrypoint schrijft `runtime.json` altijd, en een lege of ontbrekende runtime-variabele overschrijft daarmee een waarde die bij de build is meegegeven (build-arg). Stel de melding bij het Docker-image dus altijd in via de container-environment.

### GitHub Pages (serverless)

Bij een serverless installatie via GitHub Pages is er geen container en geen `runtime.json`; de melding wordt bij de build in de website ingebakken. Pas in de workflow `woo-page-deploy` de waarde van `NOTIFICATION_MESSAGE` aan:

```yaml
env:
  NOTIFICATION_MESSAGE: "We ervaren momenteel technische problemen. Mail naar gemeente@voorbeeld.nl voor hulp."
```

Na het opslaan bouwt de workflow de website opnieuw en staat de melding live zodra de actie "Deploy the WOO Page to GitHub Pages" klaar is. Verwijderen doe je door de waarde weer leeg te maken (`""`).

### Domeinconfiguratie (JSON-modus)

Draait de website met `GATSBY_ENV_VARS_SET=false`, dan komt de configuratie uit de JSON-bestanden in `pwa/static/configFiles/` (gekozen op basis van de hostnaam). Voeg dan de sleutel `GATSBY_NOTIFICATION_MESSAGE` toe aan het JSON-bestand van de organisatie. Deze bestanden worden in de build meegenomen, dus voor een wijziging is een nieuwe build en uitrol nodig. In deze modus wordt `runtime.json` niet gelezen, ook niet bij het Docker-image.

## Wanneer zien bezoekers een wijziging?

Bij het Docker-image wordt `runtime.json` zonder cache opgehaald (`cache: "no-store"`) bij elke volledige paginalading. Bezoekers zien een nieuwe, gewijzigde of verwijderde melding dus zodra ze de pagina laden of verversen, nadat de container opnieuw is gestart. Navigeren binnen de website (zonder de pagina te herladen) haalt de configuratie niet opnieuw op; een bezoeker die de website al open heeft, ziet de wijziging pas na verversen.

## Technische werking

Voor ontwikkelaars: de melding volgt hetzelfde pad als de andere configuratie-opties.

| Stap | Bestand |
| --- | --- |
| Build-arg en build-environment | `pwa/Dockerfile`, `docker-compose.yml` (`build.args`), `.env.example` |
| Runtime-environment naar `runtime.json` | `docker-compose.yml` (`environment`), `pwa/docker/entrypoint.d/30-generate-runtime.sh`, `pwa/docker/runtime.json.template` |
| GitHub Pages-build | `.github/workflows/woo-page-deploy.yml` |
| Waarde naar sessionStorage (`NOTIFICATION_MESSAGE`) | `pwa/src/hooks/useEnvironment.ts` (env, JSON-config en `runtime.json`) |
| Weergave en sluiten | `pwa/src/templates/templateParts/notificationBanner/NotificationBanner.tsx`, geplaatst in `pwa/src/Content.tsx` |
| Teksten van de regio en sluitknop | `pwa/src/translations/nl.ts`, `pwa/src/translations/en.ts` |

De gesloten melding wordt in sessionStorage bewaard onder `NOTIFICATION_DISMISSED`, met de volledige tekst als waarde; daardoor verschijnt een gewijzigde tekst vanzelf opnieuw.
