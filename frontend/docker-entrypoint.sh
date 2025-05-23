#!/bin/sh
# Substitute PORT variable in nginx config
envsubst '${PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf
# Start Nginx
exec nginx -g 'daemon off;'