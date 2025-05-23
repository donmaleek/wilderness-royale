# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Install build tools and dependencies
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Install envsubst for template substitution
RUN apk add --no-cache gettext

# Copy and process Nginx configuration
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY --from=builder /app/out /usr/share/nginx/html

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf

# Health check (adjusted for Render)
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:$PORT/ || exit 1

# Startup script that handles port substitution
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]