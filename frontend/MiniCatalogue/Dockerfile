###################
# DEVELOPMENT STAGE
###################
FROM node:24-alpine AS development

WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY --chown=node:node package*.json ./

# Installa tutte le dipendenze
RUN npm ci

# Copia tutto il codice
COPY --chown=node:node . .

# Usa utente non root
USER node

# Comando utile per sviluppo
CMD ["npm", "run", "start"]  # angular serve
EXPOSE 4200


###################
# BUILD STAGE
###################
FROM node:24-alpine AS build

WORKDIR /usr/src/app

# Copia package.json
COPY --chown=node:node package*.json ./

# Copia node_modules da development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

# Build di produzione
RUN npm run build -- --configuration production
USER node


###################
# PRODUCTION STAGE
###################
FROM nginx:1.25-alpine AS production

# Copia i file buildati di Angular nella cartella di nginx
COPY --from=build /usr/src/app/dist/MiniCatalogue/browser/. /usr/share/nginx/html

# Copia file di configurazione nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Espone porta 4200
EXPOSE 4200

# Comando finale
CMD ["nginx", "-g", "daemon off;"]