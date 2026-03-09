###################
# DEVELOPMENT STAGE
###################
FROM node:24-alpine AS development

WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY --chown=node:node package*.json ./

# Installa tutte le dipendenze (dev incluse)
RUN npm ci

# Copia tutto il codice
COPY --chown=node:node . .

# Usa l'utente non root
USER node

# Comando utile per sviluppo
CMD ["npm", "run", "start:dev"]


###################
# BUILD STAGE
###################
FROM node:24-alpine AS build

WORKDIR /usr/src/app

# Copia package.json
COPY --chown=node:node package*.json ./

# Copia node_modules da dev stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

# Build della produzione
RUN npm run build

# Installa solo le dipendenze prod
RUN npm ci --omit=dev && npm cache clean --force

ENV NODE_ENV=production
USER node


###################
# PRODUCTION STAGE
###################
FROM node:24-alpine AS production

WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copia node_modules e build
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Copia env e resources se ci sono
COPY --chown=node:node env ./env
#COPY --chown=node:node resources ./resources

# Versione app
#COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
#RUN cat package.json | grep -m1 '"version"' | awk -F: '{ gsub(/[ \",]/, "", $2); print $2 }' > ./resources/version && rm package.json

# Comando finale
CMD ["node", "dist/main.js"]
