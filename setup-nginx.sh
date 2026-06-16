#!/bin/bash
set -e

DOMAIN="rumble.globalonegaming.com"
DEPLOY_DIR="/var/www/vasnumero/rumble_Gaming_IQA"
NGINX_AVAILABLE="/etc/nginx/sites-available/${DOMAIN}.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}.conf"
CERT="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

echo "Setting up nginx for ${DOMAIN}..."

if [ ! -d "${DEPLOY_DIR}/dist" ]; then
  echo "Error: ${DEPLOY_DIR}/dist not found. Run ./deploy.sh first."
  exit 1
fi

if [ ! -f "$CERT" ]; then
  echo "No SSL cert found – installing HTTP-only config."
  cp "${DEPLOY_DIR}/nginx/${DOMAIN}.http.conf" "${NGINX_AVAILABLE}"
else
  echo "SSL cert found – installing HTTPS config."
  cp "${DEPLOY_DIR}/nginx/${DOMAIN}.conf" "${NGINX_AVAILABLE}"
fi

ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"

nginx -t
systemctl reload nginx

if [ -f "$CERT" ]; then
  echo "Nginx configured for https://${DOMAIN}"
else
  echo "Nginx configured for http://${DOMAIN}"
  echo "Run: certbot --nginx -d ${DOMAIN}"
fi
