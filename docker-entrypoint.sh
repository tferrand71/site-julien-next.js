#!/bin/sh
set -e

echo "[entrypoint] Application des migrations Prisma..."
./node_modules/.bin/prisma migrate deploy

echo "[entrypoint] Démarrage de l'application..."
exec node server.js
