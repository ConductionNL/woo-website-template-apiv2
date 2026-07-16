# CLAUDE.md — woo-website-template-apiv2

Repo-specifieke context voor Claude Code. Houd dit in sync met de werkelijke staat.

## Wat dit is
Gatsby-PWA (`pwa/`) + Helm-chart (`helm/woo-website/`) voor OpenWoo-websites.
Wordt per tenant uitgerold via ArgoCD (zie `helm/woo-website`).

## CI / container-registry beleid (besloten 2026-07-15/16, na het tag-incident)

**Bron = GitHub (`ConductionNL/woo-website-template-apiv2`), CI = GitHub
Actions, registry = ghcr.io.** Codeberg wordt read-only mirror (omzetting volgt;
tot die tijd loopt Codeberg bewust achter op GitHub — Codeberg-refs horen altijd
ancestors van de GitHub-refs te zijn).

- CI-build: `.github/workflows/container.yml` → **`ghcr.io/conductionnl/woo-website-v2`**.
  Push-auth via het ingebouwde `GITHUB_TOKEN` (permissions `packages: write`) —
  geen PAT, geen registry-secret.
- **Tag-schema (git-SHA als anker):**
  - `sha-<volledige commit-sha>` — immutable anker, elke build. Deployments
    pinnen hierop (of op digest), NOOIT op een beweegbare pointer.
  - `:development` / `:main` — beweegbare pointers die hun branch volgen
    (dev-gemak, pullPolicy Always). Bewust géén `:latest`.
  - `:vX.Y.Z` — semver bij een git-tag (promotie-anker).
  - Promotie = sha bumpen in Git. Geen datum-tags, geen omgeving-in-tag.
- Elke build draagt `org.opencontainers.image.revision` (de commit-sha) als
  label — "van welke commit komt dit image" is altijd beantwoordbaar.
- PR's bouwen zonder te pushen (zichtbare garantie). `provenance: false` is een
  bewuste pilot-keuze met heroverwegingsplicht (SLSA voor Common Ground).
- **Nooit git-tags/releases aanmaken met een branchnaam** (main/beta/
  development) — een kale tag `development` kaapte op 2026-07-14/15 de
  Forgejo-merges (root cause van het tag-incident; zie audit-spoor van 15-07).

### Verouderd (historisch, niet meer volgen)
- De Codeberg-CI (`.forgejo/workflows/dockerimage.yml`) en de Codeberg-registry
  (`codeberg.org/conduction/woo-website-v2`) zijn per 16-07 uitgefaseerd;
  Actions op de Codeberg-repo staat uit. De Codeberg-registry NIET opruimen
  zolang er tenants op node-cache van oude builds draaien.
  LET OP: de Codeberg-registry verwijdert untagged manifests zodra hun tag
  overschreven wordt — digest-pins op die registry zijn niet duurzaam.
- `build-and-push.sh` (handmatige Docker Hub-pushes) is vervangen door de
  GitHub-CI; de docker.io-builds van 01-06 dragen geen revision-labels en zijn
  niet aan commits te koppelen.

## Source-migratie (historie)
- 2026-06-02: GitHub → Codeberg (`Conduction`).
- 2026-07-15/16: terug naar GitHub (`ConductionNL`), na het tag-incident en
  het registry-besluit. `github` = bron; `origin` (Codeberg) wordt mirror.
  GitHub-restant dat nog leeft: `product-page-deploy.yml` deployt naar GitHub
  Pages vanaf de `gh-pages`-branch — uitzoeken bij de mirror-omzetting.

## Restpunten
- Chart-default `helm/woo-website/values.yaml` staat nog op
  `ghcr.io/conductionnl/woo-website-v2:latest` met pullPolicy Always; onder het
  nieuwe schema hoort daar een `sha-…`-pin (of minimaal `:main`) — bijwerken
  zodra de tenant-migratie (canary eerst) loopt.
- Tenant-migratie naar ghcr-`sha-…`-pins: zie het migratieplan van 15/16-07
  (canary = make-or-break; ignoreDifferences-afbouw per tenant via
  ApplicationSet-templatePatch).
- Legacy `.github/workflows/` uit het GitHub-tijdperk (dockerimage.yml,
  plantuml.yml, …) opruimen — plantuml triggert nu op elke push.
