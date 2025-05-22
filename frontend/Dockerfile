# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Cache dependencies layer
COPY package*.json ./
#COPY .npmrc ./
RUN npm install --frozen-lockfile

# Build application
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Correct COPY for nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy Next.js build output
COPY --from=builder /app/build /usr/share/nginx/html

# Security hardening
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf.bak

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000 || exit 1

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]