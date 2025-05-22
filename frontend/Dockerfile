# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Cache dependencies layer
COPY package*.json ./
RUN npm install --frozen-lockfile

# Build application
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy nginx config (relative path)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Next.js build output (verify your build directory)
COPY --from=builder /app/out /usr/share/nginx/html
COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]