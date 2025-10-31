# EpiSanté CRUD Starter

Spring Boot (Java 21) + React (Vite + Tailwind) + PostgreSQL. Two basic entities to begin the platform: **Patient** and **Doctor** with full CRUD, pagination, filtering, and CORS wired for the React app.

## 1) Prerequisites

* Java 21 (Temurin / OpenJDK)
* Node.js ≥ 20 + pnpm (or npm)
* Docker + Docker Compose

## 2) Quickstart (Dev)
```bash
# 1) Start Postgres + pgAdmin
cd infra && docker compose -f docker-compose.dev.yml up -d

# 2) Backend (Spring Boot)
cd ../backend
# if Maven
./mvnw spring-boot:run
# or if Gradle
# ./gradlew bootRun

# 3) Frontend (Vite + Tailwind)
cd ../frontend
cp .env.example .env
pnpm i
pnpm dev
```

* API base URL: `http://localhost:8080`
* Frontend dev server: `http://localhost:5173`

## 3) Configuration

### `backend/src/main/resources/application-dev.yml`
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/episante
    username: episante
    password: episante
  jpa:
    hibernate:
      ddl-auto: validate
    open-in-view: false
  flyway:
    enabled: true

server:
  port: 8080

cors:
  allowed-origins: ["http://localhost:5173"]
```

### `infra/env/postgres.env`
```
POSTGRES_DB=episante
POSTGRES_USER=episante
POSTGRES_PASSWORD=episante
```

### `infra/docker-compose.dev.yml`
```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    container_name: episante_db
    env_file: ./env/postgres.env
    ports: ["5432:5432"]
    volumes:
      - dbdata:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4:8
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@local
      PGADMIN_DEFAULT_PASSWORD: admin
    ports: ["5050:80"]
    depends_on: [db]
volumes:
  dbdata:
```

## 4) Domain Model

* **Patient**: `id`, `firstName`, `lastName`, `email`, `phone`, `dob`, `gender` (ENUM), `createdAt`, `updatedAt`
* **Doctor**: `id`, `firstName`, `lastName`, `email`, `phone`, `specialty`, `rpps`, `clinicAddress`, `createdAt`, `updatedAt`

Flyway migration `V1__init.sql` creates tables + indexes.

## 5) API (excerpt)

* `GET /api/patients?page&size&search`
* `POST /api/patients`
* `GET /api/patients/{id}`
* `PUT /api/patients/{id}`
* `DELETE /api/patients/{id}`
* Same for `/api/doctors`.

## 6) Frontend routes

* `/patients` list with search + pagination
* `/patients/new` create
* `/patients/:id` view/edit
* `/doctors` … analog

## 7) Testing

* Backend: JUnit 5 + Spring Boot test slices + Testcontainers (optional)
* Frontend: Vitest + React Testing Library

## 8) Lint & format

* Backend: Spotless (Google Java Format)
* Frontend: ESLint + Prettier

## 9) Building
```bash
# backend
./mvnw -DskipTests package
# frontend
pnpm build
```

## 10) Security notes (dev)

* This starter is dev-focused (no auth). Add Keycloak later.
* Never commit real secrets. For production, wire Vault/Keycloak.

## Useful Snippets

### Flyway `V1__init.sql` (example)
```sql
CREATE TYPE gender AS ENUM ('MALE','FEMALE','OTHER');

CREATE TABLE patients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name   VARCHAR(80) NOT NULL,
  last_name    VARCHAR(80) NOT NULL,
  email        VARCHAR(120) UNIQUE NOT NULL,
  phone        VARCHAR(30),
  dob          DATE,
  gender       gender,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE doctors (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name     VARCHAR(80) NOT NULL,
  last_name      VARCHAR(80) NOT NULL,
  email          VARCHAR(120) UNIQUE NOT NULL,
  phone          VARCHAR(30),
  specialty      VARCHAR(80) NOT NULL,
  rpps           VARCHAR(30),
  clinic_address TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_patients_name ON patients (last_name, first_name);
CREATE INDEX idx_doctors_specialty ON doctors (specialty);
```

### Spring CORS (example)
```java
@Bean
CorsConfigurationSource corsConfigurationSource() {
  var cfg = new CorsConfiguration();
  cfg.setAllowedOrigins(List.of("http://localhost:5173"));
  cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
  cfg.setAllowedHeaders(List.of("*"));
  var source = new UrlBasedCorsConfigurationSource();
  source.registerCorsConfiguration("/**", cfg);
  return source;
}
```

### Frontend fetch helper (TypeScript)
```ts
export const api = (path: string, init?: RequestInit) =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  }).then(async r => r.ok ? r.json() : Promise.reject(await r.json()));
```
