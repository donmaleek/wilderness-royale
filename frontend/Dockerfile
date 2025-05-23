# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Install build tools and dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build with memory limit and error logging
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build 2>&1 | tee build.log || \
    (echo "Build failed. Log output:" && cat build.log && exit 1)

# Fix asset paths for static export
RUN if [ -d "out" ]; then \
        cd out && \
        find . -type f \( -name '*.html' -o -name '*.js' \) -exec sed -i 's|/_next/|./_next/|g' {} \; ; \
    fi

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY --from=builder /app/build.log /var/log/
COPY nginx.conf.template /etc/nginx/templates/
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]