#!/usr/bin/env sh
set -eu

# Generate /usr/share/nginx/html/config/runtime.json from environment
out_dir=/usr/share/nginx/html/config
tpl=/docker-runtime-templates/runtime.json.template
mkdir -p "$out_dir"

# Allow both prefixed and unprefixed keys to be set as envs
envsubst '
${GATSBY_ORGANISATION_NAME}
${GATSBY_NL_DESIGN_THEME_CLASSNAME}
${NL_DESIGN_THEME_CLASSNAME}
${GATSBY_FAVICON_URL}
${GATSBY_JUMBOTRON_IMAGE_URL}
${GATSBY_FOOTER_LOGO_URL}
${GATSBY_FOOTER_LOGO_HREF}
${GATSBY_FOOTER_CONTENT}
${GATSBY_FOOTER_CONTENT_HEADER}
${GATSBY_OIDN_NUMBER}
${GATSBY_SHOW_CATEGORY}
${GATSBY_SHOW_ORGANIZATION}
${GATSBY_ANALYTICS_URL}
${GATSBY_DATE_FULL_MONTH}
' < "$tpl" > "$out_dir/runtime.json"

echo "[entrypoint] wrote $out_dir/runtime.json"

