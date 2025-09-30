FROM node:18 AS builder
# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Copy all files from current directory to working dir in image
# install node modules and build assets
RUN npm install

RUN npm install @parcel/watcher

COPY . .

# Build-time configuration for Gatsby (used at build, not runtime)
ARG GATSBY_ENV_VARS_SET=true
ARG GATSBY_API_BASE_URL
ARG GATSBY_DEV_ENVIRONMENT=false
ARG GATSBY_NL_DESIGN_THEME_CLASSNAME
ARG GATSBY_CSP_CONNECT_SRC_FULL
ARG GATSBY_CSP_CONNECT_SRC_EXTRA
ENV GATSBY_ENV_VARS_SET=$GATSBY_ENV_VARS_SET
ENV GATSBY_API_BASE_URL=$GATSBY_API_BASE_URL
ENV GATSBY_DEV_ENVIRONMENT=$GATSBY_DEV_ENVIRONMENT
ENV GATSBY_NL_DESIGN_THEME_CLASSNAME=$GATSBY_NL_DESIGN_THEME_CLASSNAME
ENV GATSBY_CSP_CONNECT_SRC_FULL=$GATSBY_CSP_CONNECT_SRC_FULL
ENV GATSBY_CSP_CONNECT_SRC_EXTRA=$GATSBY_CSP_CONNECT_SRC_EXTRA
ENV NODE_ENV=production

RUN npm run build

FROM nginx
COPY --from=builder /app/public /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx && chmod -R 755 /usr/share/nginx && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/templates
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
USER nginx
EXPOSE 8080
