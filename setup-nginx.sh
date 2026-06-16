#!/bin/bash
set -e

DOMAIN="rumble.globalonegaming.com"
DEPLOY_DIR="/var/www/vasnumero/rumble_Gaming_IQA"
NGINX_AVAILABLE="/etc/nginx/sites-available/${DOMAIN}.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}.conf"

echo "Setting up nginx for ${DOMAIN}..."

if [ ! -d "${DEPLOY_DIR}/dist" ]; then
  echo "Error: ${DEPLOY_DIR}/dist not found. Run ./deploy.sh first."
  exit 1
fi

cp "${DEPLOY_DIR}/nginx/${DOMAIN}.conf" "${NGINX_AVAILABLE}"
ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"

nginx -t
systemctl reload nginx

echo "Nginx configured for http://${DOMAIN}"
echo ""
echo "If you need HTTPS, run:"
echo "  certbot --nginx -d ${DOMAIN}"
