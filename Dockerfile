# Étape de construction
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM node:18-alpine AS runner

WORKDIR /app

# Définir les variables d'environnement
ENV NODE_ENV production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Changer la propriété des fichiers
RUN chown -R nextjs:nodejs /app

# Utiliser l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Définir la commande de démarrage
CMD ["node", "server.js"]

