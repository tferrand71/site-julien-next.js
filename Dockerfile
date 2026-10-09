# syntax=docker/dockerfile:1
#
# AVANT LE PREMIER DÉPLOIEMENT :
#   Julien doit créer les migrations Prisma en local (une seule fois) :
#   npx prisma migrate dev --name init
#   puis commit/push le dossier prisma/migrations/ généré.
#   Sans ce dossier, le conteneur démarre mais les tables ne sont pas créées.

FROM node:22-alpine AS base

# ---- Dépendances (prod + dev, pour prisma generate) ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build Next.js ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Image finale ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Application standalone
COPY --from=builder --chown=nextjs:nodejs /app/public            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone  ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static      ./.next/static

# Prisma : schéma + config TypeScript + migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma            ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts  ./prisma.config.ts

# CLI prisma (devDep — uniquement pour prisma migrate deploy au démarrage)
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/.bin/prisma  ./node_modules/.bin/prisma
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/prisma       ./node_modules/prisma
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/@prisma      ./node_modules/@prisma
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/dotenv       ./node_modules/dotenv

COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ENTRYPOINT ["./docker-entrypoint.sh"]
