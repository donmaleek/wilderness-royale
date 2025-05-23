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

# Adjust paths for static export
RUN find ./out -type f -name '*.html' -exec sed -i 's|/_next/|./_next/|g' {} \; && \
    find ./out -type f -name '*.js' -exec sed -i 's|/_next/|./_next/|g' {} \;

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy built files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy Nginx config template
COPY nginx.conf.template /etc/nginx/templates/

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf

# Custom entrypoint to handle port substitution
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]