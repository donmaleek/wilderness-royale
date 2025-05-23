# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

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
    rm -rf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
