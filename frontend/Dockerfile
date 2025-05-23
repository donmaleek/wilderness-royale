# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci --only=production  # More strict than --frozen-lockfile

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static output from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf && \
    find /usr/share/nginx/html -type d -exec chmod 755 {} \; && \
    find /usr/share/nginx/html -type f -exec chmod 644 {} \;

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]