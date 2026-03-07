# exercise-catalogue

Esercizio: applicazione Mini Catalogo con backend (NestJS + Fastify + PostgreSQL) e frontend (Angular).

Requisiti:

- Docker & Docker Compose
- Node.js 24+
- Nest CLI (opzionale, per sviluppo locale senza Docker)

Avvio con Docker (consigliato)
Tutti i servizi (backend, frontend, database) sono definiti in docker-compose.yml.

## Build e avvio di BE, FE, DB

Nella root del progetto lanciare il comando:

- docker compose up --build -d

Endpoint:

- Backend: http://localhost:3000
- Frontend: http://localhost:4200
- PostgreSQL: localhost:5432 (utente: postgres, password: postgres, DB: catologue)

Nota: le migrazioni PostgreSQL vengono eseguite automaticamente all’avvio del backend.
Swagger disponibile su: http://localhost:3000/api

Avvio locale del backend (senza Docker):

- Tutte le variabili di ambiente sono in env/ e il file .env.local.example può essere copiato per sviluppo locale:
- cp env/local.env.example env/local.env
- Installa le dipendenze:
  - cd backend
  - npm i

Avvia il backend in modalità sviluppo:

- npm run start:dev

Il backend sarà disponibile su http://localhost:3000.
Le migrazioni verranno eseguite automaticamente se DATABASE_MIGRATIONS=true in .env.

Avvio locale del frontend (senza Docker):

- cd frontend
- npm i
- npm run start

Il frontend sarà disponibile su http://localhost:4200.

## Struttura del progetto

exercise-catalogue/
├── backend/ # NestJS + Fastify + TypeORM
│ ├── src/
│ │ ├── modules/ # Moduli per Product, Category, ecc.
│ │ ├── migrations/ # Migrazioni PostgreSQL
│ │ └── main.ts
│ ├── package.json
│ ├── env/ # File di configurazione ambiente
│ │ ├── docker.env
│ │ ├── local.env
│ │ └── default.env
│ └── ...
├── frontend/ # Angular
│ ├── src/
│ ├── package.json
│ └── ...
├── docker-compose.yml
└── README.md

## Comandi utili

Creare una nuova migrazione:

- cd backend
- npm run migration:create src/migrations/<nome_migrazione>

Swagger API: http://localhost:3000/api

## Variabili d'ambiente

- Utilizzare process.env solo in main.ts e app.module.ts:
  - APP_PORT – porta su cui avviare il backend
  - LOG_LEVEL – livello di log per Pino
  - APP_ENV – definisce quale file .env usare
    -ONLY_SWAGGER_SPEC – impostare true solo durante la generazione dello Swagger; non modificare manualmente
- Negli altri file, usare sempre ConfigService per leggere le variabili di configurazione.

## Log

È possibile cambiare il livello dei log usando la variabile di ambiente LOG_LEVEL.
Pino utilizza una convenzione diversa rispetto a NestJS; la tabella di conversione è:

LOG_LEVEL | NESTJS
trace | verbose
debug | debug
info | log
warn | warn
error | error

## Note

- Le migrazioni sono gestite solo se DATABASE_SYNC=false.
- La versione dell’applicazione è letta da resources/version.
