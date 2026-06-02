# CLAUDE.md — woo-website-template-apiv2

Repo-specifieke context voor Claude Code. Houd dit in sync met de werkelijke staat.

## Wat dit is
Gatsby-PWA (`pwa/`) + Helm-chart (`helm/woo-website/`) voor OpenWoo-websites.
Wordt per tenant uitgerold via ArgoCD (zie `helm/woo-website`).

## CI / container-registry beleid (besloten 2026-06-02)

**Voorlopig: bouwen op Codeberg, pushen naar de Codeberg-registry via PAT.**
De directeur wil dit eerst zo houden. Pas als dat niet opschiet stappen we over
naar Docker Hub.

- CI-build: `.forgejo/workflows/container.yml` draait op een Codeberg-runner
  (`codeberg-medium`) en pusht naar **`codeberg.org/conduction/woo-website-v2`**
  (`secrets.CODEBERG_USERNAME` / `secrets.CODEBERG_TOKEN`, een write:packages-PAT).
- Handmatig alternatief: `build-and-push.sh` pusht naar
  **`docker.io/conduction2022/woo-website-v2`** (Docker Hub).

### Bekende mismatch (bewust, tijdelijk)
De ArgoCD-deployments zijn op 2026-06-02 gemigreerd om van **Docker Hub**
(`docker.io/conduction2022/woo-website-v2`) te pullen, terwijl de CI naar de
**Codeberg-registry** pusht. De build→deploy-loop is dus NIET rond: een push naar
`main` bouwt wel, maar de nieuwe image bereikt de draaiende apps niet automatisch
(daarvoor moet nu handmatig `build-and-push.sh` naar Docker Hub draaien).

### De fix wanneer we overstappen (Docker Hub)
Wanneer de overstap akkoord is: in `container.yml` het push-target omzetten naar
Docker Hub, zodat CI pusht waar de deployments pullen:

```yaml
tag: "docker.io/conduction2022/woo-website-v2:${{ steps.meta.outputs.tag }}"
registry: "docker.io"
username: "${{ secrets.DOCKERHUB_USERNAME }}"
password: "${{ secrets.DOCKERHUB_TOKEN }}"
```

Vereist `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` als secrets in de Codeberg-repo.
Daarna is de loop rond (bouwen op Codeberg → Docker Hub → deployments) en kan de
Codeberg-registry-push eruit.

## Source-migratie GitHub → Codeberg (2026-06-02)
Repo is verhuisd van GitHub (`ConductionNL`) naar Codeberg (`Conduction`).
`origin` = Codeberg, `github` = oude remote. De GitHub-repo is voor ArgoCD niet
meer bereikbaar (`Repository not found`). Alle ArgoCD woo-apps zijn omgezet naar
de Codeberg-source. Let op resterend GitHub-restant: `product-page-deploy.yml`
deployt nog naar GitHub Pages.

## Restpunten
- Chart-default `helm/woo-website/values.yaml` staat nog op `ghcr.io/conductionnl/woo-website-v2`;
  deployments overschrijven dit per app naar Docker Hub. Default bijwerken is hygiëne.
