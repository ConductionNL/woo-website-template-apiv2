# syntax=docker/dockerfile:1.6

# Stage 1: build the Gatsby static site
FROM node:18.20.5-alpine3.20 AS builder

# Skip husky in container (no git context); silence npm noise; production build
ENV HUSKY=0 \
    NODE_ENV=production \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

WORKDIR /app

# Reproducible install: lockfile-driven. @parcel/watcher zit in devDependencies,
# dus de aparte install-stap die hier eerder stond is niet meer nodig.
COPY package.json package-lock.json ./
RUN npm ci

# App-sources na deps zodat de dep-layer cachet
COPY . .

# Build-time config voor Gatsby. TODO: branding/theming naar runtime.json
# (zie helm/woo-website/templates/config-runtime.yaml) zodat één image
# alle tenants kan bedienen i.p.v. per-tenant builds.
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
ARG GATSBY_FOOTER_LOGO_URL
ARG GATSBY_FOOTER_LOGO_HREF
ARG GATSBY_FOOTER_CONTENT
ARG GATSBY_FOOTER_CONTENT_HEADER
ARG GATSBY_OIDN_NUMBER
ARG GATSBY_SHOW_CATEGORY
ARG GATSBY_SHOW_ORGANIZATION
ARG GATSBY_ANALYTICS_URL
ARG GATSBY_DATE_FULL_MONTH
ENV GATSBY_ENV_VARS_SET=$GATSBY_ENV_VARS_SET \
    GATSBY_API_BASE_URL=$GATSBY_API_BASE_URL \
    GATSBY_DEV_ENVIRONMENT=$GATSBY_DEV_ENVIRONMENT \
    GATSBY_NL_DESIGN_THEME_CLASSNAME=$GATSBY_NL_DESIGN_THEME_CLASSNAME \
    GATSBY_CSP_CONNECT_SRC_FULL=$GATSBY_CSP_CONNECT_SRC_FULL \
    GATSBY_CSP_CONNECT_SRC_EXTRA=$GATSBY_CSP_CONNECT_SRC_EXTRA \
    GATSBY_SHOW_THEME_SWITCHER=$GATSBY_SHOW_THEME_SWITCHER \
    GATSBY_FAVICON_URL=$GATSBY_FAVICON_URL \
    GATSBY_ORGANISATION_NAME=$GATSBY_ORGANISATION_NAME \
    GATSBY_JUMBOTRON_IMAGE_URL=$GATSBY_JUMBOTRON_IMAGE_URL \
    GATSBY_FOOTER_LOGO_URL=$GATSBY_FOOTER_LOGO_URL \
    GATSBY_FOOTER_LOGO_HREF=$GATSBY_FOOTER_LOGO_HREF \
    GATSBY_FOOTER_CONTENT=$GATSBY_FOOTER_CONTENT \
    GATSBY_FOOTER_CONTENT_HEADER=$GATSBY_FOOTER_CONTENT_HEADER \
    GATSBY_OIDN_NUMBER=$GATSBY_OIDN_NUMBER \
    GATSBY_SHOW_CATEGORY=$GATSBY_SHOW_CATEGORY \
    GATSBY_SHOW_ORGANIZATION=$GATSBY_SHOW_ORGANIZATION \
    GATSBY_ANALYTICS_URL=$GATSBY_ANALYTICS_URL \
    GATSBY_DATE_FULL_MONTH=$GATSBY_DATE_FULL_MONTH

RUN npm run build

# Stage 2: serveer via nginx (alpine — minimal attack surface)
FROM nginx:1.27.3-alpine

COPY --from=builder /app/public /usr/share/nginx/html

# nginx-paden writable maken voor non-root nginx-user. Stelt readOnlyRootFilesystem
# op pod-niveau mogelijk i.c.m. emptyDir voor /var/cache/nginx en /var/run.
RUN chown -R nginx:nginx /usr/share/nginx \
 && chmod -R 755 /usr/share/nginx \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && chown -R nginx:nginx /etc/nginx/conf.d \
 && touch /var/run/nginx.pid \
 && chown -R nginx:nginx /var/run/nginx.pid

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/entrypoint.d/30-generate-runtime.sh /docker-entrypoint.d/30-generate-runtime.sh
COPY docker/runtime.json.template /docker-runtime-templates/runtime.json.template
RUN chmod +x /docker-entrypoint.d/30-generate-runtime.sh

ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d \
    NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/templates

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:8080/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
