# Stage 1: build the Gatsby static site
FROM node:20.19.6-alpine3.23 AS builder

# Skip husky in container (no git context); silence npm noise; production build
ENV HUSKY=0 \
    NODE_ENV=production \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

WORKDIR /app

# npm log files are the whiteout source on this infra: every npm run writes
# a timestamped log to /root/.npm/_logs and prunes older ones, and deleting
# a file that came from an EARLIER layer becomes a whiteout entry (.wh.*)
# in the layer tar. kaniko materializes whiteouts as literal files when it
# re-extracts CACHED layers, and the CI runners' overlayfs forbids creating
# ".wh.*" names — so any full cache hit dies with ".wh.* invalid argument"
# (observed 2026-07-07 between the two npm installs, 2026-07-09 between
# npm install and npm run build). logs-max=0 stops npm writing log files at
# all: nothing to rotate, no cross-layer deletes, no whiteouts. Changing
# this line also changes every cache key, retiring the poisoned cache
# entries without manual registry cleanup.
ENV NPM_CONFIG_LOGS_MAX=0

COPY package.json package-lock.json ./

# Reproducible install: lockfile-driven. --include=dev because NODE_ENV=production
# would otherwise skip the build tooling (@parcel/watcher and friends live in
# devDependencies).
RUN npm ci --include=dev

COPY . .

# Build-time configuration for Gatsby (used at build, not runtime)
ARG GATSBY_ENV_VARS_SET=true
ARG GATSBY_API_BASE_URL
ARG GATSBY_DEV_ENVIRONMENT=false
ARG GATSBY_NL_DESIGN_THEME_CLASSNAME
ARG GATSBY_CSP_CONNECT_SRC_FULL
ARG GATSBY_CSP_CONNECT_SRC_EXTRA
ARG GATSBY_SHOW_THEME_SWITCHER
ARG GATSBY_FAVICON_URL
ARG GATSBY_ORGANISATION_NAME
ARG GATSBY_JUMBOTRON_IMAGE_URL
ARG GATSBY_JUMBOTRON_TITLE
ARG GATSBY_JUMBOTRON_SUBTITLE
ARG GATSBY_FOOTER_LOGO_URL
ARG GATSBY_FOOTER_LOGO_HREF
ARG GATSBY_FOOTER_CONTENT
ARG GATSBY_FOOTER_CONTENT_HEADER
ARG GATSBY_OIDN_NUMBER
ARG GATSBY_SHOW_CATEGORY
ARG GATSBY_SHOW_ORGANIZATION
ARG GATSBY_ANALYTICS_URL
ARG GATSBY_DATE_FULL_MONTH
ARG GATSBY_TABLE_SCROLL_MODE
ARG GATSBY_HIDE_LANGUAGE_SWITCH
# Gatsby spawns one build worker per visible CPU core by default; CI passes
# a small number here to bound peak memory (the default keeps local builds
# unchanged). Accepts a number, "logical_cores" or "physical_cores".
ARG GATSBY_CPU_COUNT=logical_cores
ENV GATSBY_CPU_COUNT=$GATSBY_CPU_COUNT
ENV GATSBY_ENV_VARS_SET=$GATSBY_ENV_VARS_SET
ENV GATSBY_API_BASE_URL=$GATSBY_API_BASE_URL
ENV GATSBY_DEV_ENVIRONMENT=$GATSBY_DEV_ENVIRONMENT
ENV GATSBY_NL_DESIGN_THEME_CLASSNAME=$GATSBY_NL_DESIGN_THEME_CLASSNAME
ENV GATSBY_CSP_CONNECT_SRC_FULL=$GATSBY_CSP_CONNECT_SRC_FULL
ENV GATSBY_CSP_CONNECT_SRC_EXTRA=$GATSBY_CSP_CONNECT_SRC_EXTRA
ENV GATSBY_SHOW_THEME_SWITCHER=$GATSBY_SHOW_THEME_SWITCHER
ENV GATSBY_FAVICON_URL=$GATSBY_FAVICON_URL
ENV GATSBY_ORGANISATION_NAME=$GATSBY_ORGANISATION_NAME
ENV GATSBY_JUMBOTRON_IMAGE_URL=$GATSBY_JUMBOTRON_IMAGE_URL
ENV GATSBY_JUMBOTRON_TITLE=$GATSBY_JUMBOTRON_TITLE
ENV GATSBY_JUMBOTRON_SUBTITLE=$GATSBY_JUMBOTRON_SUBTITLE
ENV GATSBY_FOOTER_LOGO_URL=$GATSBY_FOOTER_LOGO_URL
ENV GATSBY_FOOTER_LOGO_HREF=$GATSBY_FOOTER_LOGO_HREF
ENV GATSBY_FOOTER_CONTENT=$GATSBY_FOOTER_CONTENT
ENV GATSBY_FOOTER_CONTENT_HEADER=$GATSBY_FOOTER_CONTENT_HEADER
ENV GATSBY_OIDN_NUMBER=$GATSBY_OIDN_NUMBER
ENV GATSBY_SHOW_CATEGORY=$GATSBY_SHOW_CATEGORY
ENV GATSBY_SHOW_ORGANIZATION=$GATSBY_SHOW_ORGANIZATION
ENV GATSBY_ANALYTICS_URL=$GATSBY_ANALYTICS_URL
ENV GATSBY_DATE_FULL_MONTH=$GATSBY_DATE_FULL_MONTH
ENV GATSBY_TABLE_SCROLL_MODE=$GATSBY_TABLE_SCROLL_MODE
ENV GATSBY_HIDE_LANGUAGE_SWITCH=$GATSBY_HIDE_LANGUAGE_SWITCH

RUN npm run build

# Stage 2: serve via nginx (alpine — minimal attack surface)
FROM nginx:1.30.4-alpine3.24
COPY --from=builder /app/public /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx && chmod -R 755 /usr/share/nginx && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
# NB no pid-file setup here: the pid lives in /tmp (see docker/nginx.conf) —
# /var/run is on kaniko's ignore list and does not exist during CI builds.

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
# templates/includes/ maps to conf.d/includes/ — outside the conf.d/*.conf
# auto-include glob, pulled in explicitly by default.conf
COPY docker/security-headers.conf.template /etc/nginx/templates/includes/security-headers.conf.template
COPY docker/entrypoint.d/30-generate-runtime.sh /docker-entrypoint.d/30-generate-runtime.sh
COPY docker/runtime.json.template /docker-runtime-templates/runtime.json.template
RUN chmod +x /docker-entrypoint.d/30-generate-runtime.sh
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/templates
# Allowed iframe ancestors (CSP frame-ancestors). Override at runtime for
# municipalities that embed the site in a portal, e.g. "'self' https://portal.example.nl"
ENV FRAME_ANCESTORS="'none'"

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:8080/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
