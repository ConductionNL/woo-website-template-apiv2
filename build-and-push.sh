#!/usr/bin/env bash
# SPDX-License-Identifier: EUPL-1.2
# role: tool
#
# build-and-push.sh — bouw de PWA-container lokaal en push naar Docker Hub.
#
# Vervanger voor de GitHub/Forgejo Actions CI: op Codeberg hebben we (nog) geen
# rechten om Actions aan te zetten, dus bouwen we het image lokaal en pushen het
# naar Docker Hub onder de namespace 'conduction2022'.
#
# Ontwerpkeuzes:
#   - Geisoleerde DOCKER_CONFIG (project-lokale .docker/-map) zodat een
#     'docker login' hier je persoonlijke ~/.docker/config.json NIET aanraakt.
#   - CONTAINER_REGISTRY_BASE wordt als shell-override meegegeven; dat wint van
#     de waarde in .env (docker compose: shell-env > .env). Zo hoeven we het
#     getrackte .env-bestand niet te bewerken.
#   - Image-naam en build-args komen verder uit docker-compose.yml + .env, net
#     als in de oude CI, zodat de output identiek is.
#
# Writes: .docker/ (geisoleerde docker-credentialstore), lokale docker-images.
# Idempotent: ja — herhaald draaien herbouwt/herpusht dezelfde tag.
# Requires: docker, docker compose v2, een .env in de repo-root.
#           Auth: of DOCKERHUB_TOKEN (+ optioneel DOCKERHUB_USERNAME) in de
#           omgeving, of een interactieve login bij eerste run.
#
# Usage:
#   ./build-and-push.sh dev                       # bouw+push tag 'dev'
#   ./build-and-push.sh latest                    # bouw+push tag 'latest'
#   DOCKERHUB_TOKEN=*** ./build-and-push.sh dev   # niet-interactieve login
#   ./build-and-push.sh dev --no-push             # alleen lokaal bouwen
#
# Env-overrides (defaults tussen haakjes):
#   DOCKERHUB_USERNAME      Docker Hub user/namespace   (conduction2022)
#   CONTAINER_REGISTRY_BASE registry + namespace        (docker.io/conduction2022)
#   DOCKERHUB_TOKEN         access token voor login     (leeg -> interactief)

set -euo pipefail

readonly DEFAULT_NAMESPACE="conduction2022"
readonly COMPOSE_SERVICE="pwa"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_DIR

log() {
  echo "==> $*"
}

err() {
  echo "error: $*" >&2
}

usage() {
  err "usage: $0 <tag> [--no-push]"
  err "  bouwt docker.io/${DEFAULT_NAMESPACE}/<project>:<tag> en pusht naar Docker Hub"
  exit 64
}

# Logt in op Docker Hub binnen de geisoleerde DOCKER_CONFIG. Token via stdin als
# DOCKERHUB_TOKEN is gezet; anders interactief. Bestaande login wordt hergebruikt.
docker_login() {
  local user="${DOCKERHUB_USERNAME:-${DEFAULT_NAMESPACE}}"

  if [[ -f "${DOCKER_CONFIG}/config.json" ]] \
    && grep -q 'index.docker.io' "${DOCKER_CONFIG}/config.json" 2>/dev/null; then
    log "Bestaande Docker Hub-login gevonden in ${DOCKER_CONFIG}; sla login over"
    return 0
  fi

  if [[ -n "${DOCKERHUB_TOKEN:-}" ]]; then
    log "Login op Docker Hub als ${user} via token (stdin)"
    printf '%s' "${DOCKERHUB_TOKEN}" \
      | docker login docker.io -u "${user}" --password-stdin
  else
    log "Geen DOCKERHUB_TOKEN gezet; interactieve login als ${user}"
    docker login docker.io -u "${user}"
  fi
}

main() {
  local tag="${1:-}"
  local do_push="true"

  [[ -z "${tag}" || "${tag}" == "-h" || "${tag}" == "--help" ]] && usage
  if [[ "${2:-}" == "--no-push" ]]; then
    do_push="false"
  fi

  cd "${SCRIPT_DIR}"

  if [[ ! -f .env ]]; then
    err ".env ontbreekt in ${SCRIPT_DIR}; docker compose heeft die nodig"
    exit 1
  fi

  # Geisoleerde credentialstore: raakt ~/.docker/config.json niet aan.
  export DOCKER_CONFIG="${DOCKER_CONFIG:-${SCRIPT_DIR}/.docker}"
  mkdir -p "${DOCKER_CONFIG}"

  # Overrides die docker compose oppikt (winnen van .env).
  export CONTAINER_REGISTRY_BASE="${CONTAINER_REGISTRY_BASE:-docker.io/${DEFAULT_NAMESPACE}}"
  export APP_BUILD="${tag}"

  log "Registry : ${CONTAINER_REGISTRY_BASE}"
  log "Tag      : ${APP_BUILD}"
  log "Config   : ${DOCKER_CONFIG}"
  log "Push     : ${do_push}"

  log "Bouwen van service '${COMPOSE_SERVICE}'"
  docker compose build "${COMPOSE_SERVICE}"

  if [[ "${do_push}" != "true" ]]; then
    log "--no-push: klaar na build"
    return 0
  fi

  docker_login
  log "Pushen van service '${COMPOSE_SERVICE}'"
  docker compose push "${COMPOSE_SERVICE}"

  log "Klaar: ${CONTAINER_REGISTRY_BASE}/<project>:${APP_BUILD} gepusht"
}

main "$@"
