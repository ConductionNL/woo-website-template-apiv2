# Stage 1: Build SPA
FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install @parcel/watcher

COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:latest

# Copy built SPA
COPY --from=builder /app/public /usr/share/nginx/html

# Copy main nginx.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy template for envsubst
COPY docker/templates/default.conf.template /etc/nginx/templates/default.conf.template

# Fix permissions for nginx user
RUN mkdir -p /var/run/nginx /var/cache/nginx /var/log/nginx \
    && chown -R nginx:nginx /usr/share/nginx /etc/nginx /var/run/nginx /var/cache/nginx /var/log/nginx

# Run as nginx user
USER nginx

EXPOSE 8080
