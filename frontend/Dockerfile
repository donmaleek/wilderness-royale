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
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY --from=builder /app/out /usr/share/nginx/html

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf

# Health check (pointing to correct location)
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:$PORT/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]