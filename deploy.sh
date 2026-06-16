#!/bin/bash
set -e

DEPLOY_DIR="/var/www/vasnumero/rumble_Gaming_IQA"
REPO_URL="https://github.com/akashzeen-art/rumble-gaming-iraq.git"

echo "Deploying Rumble Gaming IQA..."

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

echo "Deployment complete."
echo "Serve the dist/ folder from your web server (nginx/apache)."
ls -la dist/
