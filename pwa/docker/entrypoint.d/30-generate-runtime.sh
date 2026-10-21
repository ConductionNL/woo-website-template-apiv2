#!/usr/bin/env sh
set -eu

# Generate /usr/share/nginx/html/config/runtime.json from environment
out_dir=/usr/share/nginx/html/config
tpl=/docker-runtime-templates/runtime.json.template
mkdir -p "$out_dir"

# Allow both prefixed and unprefixed keys to be set as envs; map theme envs to a single placeholder
THEME="${NL_DESIGN_THEME_CLASSNAME:-${GATSBY_NL_DESIGN_THEME_CLASSNAME:-}}"
export THEME

# Maintenance: the unprefixed names win. Platform deployments (react-tenants
# ApplicationSet) ignore-diff GATSBY_* env for tenants without a branding block,
# so a GATSBY_ value set in git would never reach those pods; MAINTENANCE_* always does.
for name in MAINTENANCE_MODE MAINTENANCE_TITLE_NL MAINTENANCE_MESSAGE_NL MAINTENANCE_TITLE_EN MAINTENANCE_MESSAGE_EN; do
  eval "export GATSBY_$name=\"\${$name:-\${GATSBY_$name:-}}\""
done

# Single source of truth for which variables reach runtime.json — used both
# for JSON-escaping below and as the envsubst whitelist.
RUNTIME_VARS="
THEME
GATSBY_ORGANISATION_NAME
GATSBY_FAVICON_URL
GATSBY_JUMBOTRON_IMAGE_URL
GATSBY_JUMBOTRON_TITLE
GATSBY_JUMBOTRON_SUBTITLE
GATSBY_FOOTER_LOGO_URL
GATSBY_FOOTER_LOGO_HREF
GATSBY_FOOTER_CONTENT
GATSBY_FOOTER_CONTENT_HEADER
GATSBY_FOOTER_HIDE_LOVE
GATSBY_FOOTER_HIDE_LOGO
GATSBY_OIDN_NUMBER
GATSBY_SHOW_CATEGORY
GATSBY_SHOW_ORGANIZATION
GATSBY_ANALYTICS_URL
GATSBY_DATE_FULL_MONTH
GATSBY_TABLE_SCROLL_MODE
GATSBY_HIDE_LANGUAGE_SWITCH
GATSBY_MAINTENANCE_MODE
GATSBY_MAINTENANCE_TITLE_NL
GATSBY_MAINTENANCE_MESSAGE_NL
GATSBY_MAINTENANCE_TITLE_EN
GATSBY_MAINTENANCE_MESSAGE_EN
"

# JSON-escape every substituted value: envsubst splices values into JSON
# string literals and knows nothing about JSON, so a double quote or
# backslash in any single value (e.g. a jumbotron title) would make the
# whole runtime.json unparseable — silently discarding ALL runtime config.
# Escape \ first, then ", and drop newlines (illegal inside JSON strings).
subst_list=""
for var in $RUNTIME_VARS; do
  eval "val=\${$var:-}"
  val=$(printf '%s' "$val" | tr -d '\n\r' | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')
  export "$var=$val"
  subst_list="$subst_list \${$var}"
done

envsubst "$subst_list" < "$tpl" > "$out_dir/runtime.json"

chmod 0644 "$out_dir/runtime.json" || true
echo "[entrypoint] wrote $out_dir/runtime.json:"
ls -l "$out_dir" || true

# Also expose a root-level fallback to bypass potential ingress path restrictions
cp -f "$out_dir/runtime.json" /usr/share/nginx/html/runtime.json || true
chmod 0644 /usr/share/nginx/html/runtime.json || true
echo "[entrypoint] wrote /usr/share/nginx/html/runtime.json"

# Maintenance mode also closes the API proxy: nginx answers /api/ itself with a
# 503, so no request reaches the backend (e.g. while it is shut down for a
# security incident). The JSON body marks it as maintenance, so the app keeps
# its themed maintenance screen instead of treating it as an outage.
# default.conf includes this file in the /api/ location, so it must always
# exist — empty when maintenance mode is off.
maintenance_conf=/etc/nginx/conf.d/includes/maintenance-api.conf
mkdir -p "$(dirname "$maintenance_conf")"
if [ "${GATSBY_MAINTENANCE_MODE:-}" = "true" ]; then
  printf '%s\n' 'default_type application/json;' "return 503 '{\"maintenance\":true}';" > "$maintenance_conf"
  echo "[entrypoint] maintenance mode ON: /api/ proxy closed (503)"
else
  : > "$maintenance_conf"
fi
