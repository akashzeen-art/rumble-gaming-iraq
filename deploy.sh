#!/bin/bash
set -e

DEPLOY_DIR="/var/www/vasnumero/rumble_Gaming_IQA"
REPO_URL="https://github.com/akashzeen-art/rumble-gaming-iraq.git"
DOMAIN="rumble.globalonegaming.com"

echo "Deploying Rumble Gaming IQA -> ${DOMAIN}"

if [ ! -d "$DEPLOY_DIR/.git" ]; then
  echo "Cloning repository..."
  mkdir -p "$DEPLOY_DIR"
  git clone "$REPO_URL" "$DEPLOY_DIR"
fi

cd "$DEPLOY_DIR"

echo "Pulling latest from GitHub..."
git pull origin main

echo "Cleaning npm cache and old modules..."
npm cache clean --force
rm -rf node_modules

echo "Installing dependencies..."
npm install --prefer-online

echo "Building production bundle..."
npm run build

if [ -f "setup-nginx.sh" ]; then
  echo "Updating nginx config..."
  chmod +x setup-nginx.sh
  ./setup-nginx.sh
fi

echo ""
echo "Deployment complete."
echo "  Site:  http://${DOMAIN}"
echo "  Files: ${DEPLOY_DIR}/dist"
ls -la dist/
