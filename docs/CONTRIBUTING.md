# Bijdragen aan OpenWoo.app

Deelnemen aan het OpenWoo.app project is een uitnodiging om deel uit te maken van een gemeenschap die zich inzet voor het creëren van een open en innovatief webplatform. Als open-source initiatief waarderen we de inbreng van iedereen, ongeacht ervaringsniveau of achtergrond. Hier zijn enkele manieren waarop u kunt bijdragen aan het project:

1. **Issues Aanmaken:**
   Als u een bug vindt, een nieuw kenmerk voorstelt of feedback wilt geven, kunt u een issue aanmaken op onze GitHub pagina: [Issues aanmaken](https://github.com/ConductionNL/woo-website-template/issues). Dit helpt ons om het project georganiseerd en prioriteit te geven aan werk dat moet worden gedaan.

2. **Pull Requests Indienen:**
   Heeft u een verbetering of een bugfix? Voel u vrij om een Pull Request (PR) in te dienen op onze [GitHub repository](https://github.com/ConductionNL/woo-website-template/). Zorg ervoor dat u de richtlijnen in de `CONTRIBUTING.md`-file volgt, zodat we uw bijdrage gemakkelijk kunnen beoordelen en samenvoegen.

3. **Documentatie Verbeteren:**
   Goede documentatie maakt een project toegankelijker en gebruiksvriendelijker. Als u verbeteringen ziet die kunnen worden aangebracht aan onze README, wiki, of andere documentatie, aarzel dan niet om suggesties te doen of direct bij te dragen.

4. **Code Review:**
   Help ons de kwaliteit van de code te behouden door deel te nemen aan code reviews, feedback te geven en suggesties te doen voor verbetering.

Wij geloven in de kracht van een gemeenschap die samenwerkt om iets geweldigs te bouwen. Uw bijdragen, groot of klein, zijn waardevol voor het succes van OpenWoo.app. Samen kunnen we een open, flexibel en gebruiksvriendelijk platform creëren dat de manier waarop we op het web werken, transformeert.

We kijken uit naar uw bijdragen en het samen bouwen aan een de OpenWoo.app.

## Commit-berichten: Conventional Commits (verplicht)

Commit-berichten volgen [Conventional Commits](https://www.conventionalcommits.org):
`type(scope)?: omschrijving`. De commit-types sturen de **automatische semantische
versionering** van de Docker-images aan (semantic-release, zie
`.github/workflows/release.yml`) — een verkeerd type betekent dus ongemerkt een verkeerde
of ontbrekende versie.

| Type | Betekenis | Versie-effect |
|---|---|---|
| `fix:` | Herstelt een bug voor de gebruiker | **patch** (`1.0.0` → `1.0.1`) |
| `feat:` | Nieuwe functionaliteit voor de gebruiker | **minor** (`1.0.0` → `1.1.0`) |
| `feat!:` of footer `BREAKING CHANGE:` | Wijziging die bestaand gebruik breekt (API, config, gedrag) | **major** (`1.0.0` → `2.0.0`) |
| `ci:` | CI/pipeline-configuratie (workflows onder `.github/`/`.forgejo/`, release-automatisering) | geen release |
| `build:` | Build-systeem en tooling (Dockerfile, npm-scripts, dependencies) | geen release |
| `chore:` | Onderhoud dat nergens anders past | geen release |
| `docs:` | Alleen documentatie | geen release |
| `refactor:` | Code herstructureren zonder gedragswijziging | geen release |
| `perf:` | Performance-verbetering | geen release |
| `style:` | Formattering/whitespace, geen logica | geen release |
| `test:` | Tests toevoegen of herstellen | geen release |
| `revert:` | Een eerdere commit terugdraaien | geen release |

Kies het type vanuit de **gebruiker van de Docker-image** gezien: verandert er
niets aan wat de applicatie doet (zoals bij `ci:`, `docs:`, `chore:`), dan is er
geen reden voor een nieuw versienummer. Landen er op `development` alléén
commits zonder versie-effect, dan wordt er dus **geen** release of versietag
gemaakt — de `:development`-branch-image wordt wel gewoon opnieuw gebouwd (dat
triggert de push zelf), er komt alleen geen nieuw versienummer.

De hook controleert het *formaat*, niet de *eerlijkheid*: of iets dat `fix:`
heet écht een bugfix is en geen feature, blijft een verantwoordelijkheid van de
code review.

Let op:

- `hotfix:` is **geen** geldig type. Hotfix-*branches* heten `hotfix/*`, maar de
  commits en PR-titels gebruiken `fix:`.
- Een lokale git-hook (`.husky/commit-msg`, via husky/commitlint) weigert
  afwijkende berichten direct bij het committen; CI controleert daarnaast elke
  PR (titel én alle commits), dus omzeilen met `--no-verify` heeft geen zin.
- Alle PR's worden met een **merge commit** samengevoegd. Daardoor komt elke
  individuele commit van je branch in de historie terecht en telt **elke
  commit mee voor de versie** — niet de PR-titel. Gebruik `fix:`/`feat:` dus
  alleen voor commits die écht een gebruikersgerichte wijziging bevatten;
  tussenstappen en opruimwerk zijn `chore:`/`refactor:`/`docs:`. Elke
  `fix:`/`feat:`-commit wordt ook een regel in de changelog.
- Markeer een breaking change in de commit zelf: `feat!: …` (of een
  `BREAKING CHANGE:`-footer).
- PR-titels volgen dezelfde conventie (CI controleert dit) — voor een leesbaar
  PR-overzicht; de versie wordt bepaald door de commits. Uitzondering: de
  promotie-PR's (`development → beta`, `beta → main`) en de automatische
  `backmerge/*`-PR's — hun titel hoeft geen Conventional Commit te zijn (de
  titel-check slaat ze over).

### Merge-methode

**Alle PR's worden met een merge commit samengevoegd** — feature-branches,
hotfixes, promoties (`development → beta → main`) en back-merges. Squash en
rebase worden niet gebruikt (bij voorkeur uitgezet in de repo-instellingen):

- Squashen van een promotie- of back-merge-PR klapt de release-historie samen
  tot één commit — de versie zou dan door één titel bepaald worden en
  `development` verliest de release-tags die het nodig heeft voor correcte
  prerelease-versies.
- Rebase-mergen herschrijft commit-SHA's, waardoor de `sha-<sha>`-image-tags
  niet meer terugwijzen naar de gebouwde commits.
- Merge commits zelf ("Merge pull request …") zijn onschadelijk: commitlint en
  semantic-release negeren ze allebei.

## Licenties van dependencies

CI controleert alle npm-dependencies tegen een lijst goedgekeurde licenties
(zie ook de sectie *Licensing* in de README). Voor bijdragers is dit relevant:

- Voegt een nieuwe dependency zonder geldige SPDX-licentie een fout toe aan de
  "License (npm)"-check? Neem de package dan alleen op als daar een goede reden
  voor is, en voeg een entry toe aan
  [`.license-overrides.json`](../.license-overrides.json) met onderbouwing,
  je GitHub-handle en datum (zie de bestaande entries voor het formaat).
- `pwa/package.json` bevat bewust **`"private": true`**: dit is een website,
  geen npm-package. De vlag maakt `npm publish` onmogelijk — ook per ongeluk,
  bijvoorbeeld door CI-tooling (semantic-release's npm-plugin slaat publiceren
  over dankzij deze vlag). **Niet verwijderen.**
- Daardoor rapporteert license-checker onze eigen package altijd als
  `UNLICENSED`: de tool negeert het licentieveld van private packages. Het
  licentieveld (`EUPL-1.2`) is correcte metadata voor mensen en andere tooling,
  en de eigen package heeft daarnaast een entry in `.license-overrides.json`
  voor de check. Beide zijn nodig; geen van beide is overbodig.
