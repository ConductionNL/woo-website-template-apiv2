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
`VERSIONING-PLAN-v3.md`) — een verkeerd type betekent dus ongemerkt een verkeerde
of ontbrekende versie.

| Type | Versie-effect |
|---|---|
| `fix:` | patch (`1.0.0` → `1.0.1`) |
| `feat:` | minor (`1.0.0` → `1.1.0`) |
| `feat!:` of footer `BREAKING CHANGE:` | major (`1.0.0` → `2.0.0`) |
| `build:` `chore:` `ci:` `docs:` `perf:` `refactor:` `revert:` `style:` `test:` | geen release |

Let op:

- `hotfix:` is **geen** geldig type. Hotfix-*branches* heten `hotfix/*`, maar de
  commits en PR-titels gebruiken `fix:`.
- Een lokale git-hook (`.husky/commit-msg`, via husky/commitlint) weigert
  afwijkende berichten direct bij het committen; CI controleert daarnaast elke
  PR (titel én alle commits), dus omzeilen met `--no-verify` heeft geen zin.
- PR-titels volgen dezelfde conventie: feature/hotfix-PR's worden ge-squash-merged,
  waardoor de PR-titel de commit wordt die de versie bepaalt.

### Merge-methodes per branch-paar

| PR | Merge-methode |
|---|---|
| feature/fix-branch → `development` | **Squash** |
| `hotfix/*` → `main` | **Squash** |
| `development` → `beta` en `beta` → `main` | **Merge commit — nooit squashen of rebasen** |
| back-merge `main` → `development` (na elke stabiele release) | **Merge commit — nooit squashen** |

Squashen van een promotie- of back-merge-PR klapt de release-historie samen tot
één commit: de versie-bump zou dan door die ene titel bepaald worden en
`development` verliest de release-tags die het nodig heeft om correcte
prerelease-versies te berekenen.
