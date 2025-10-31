# Microscope - Step-by-step Checklist

## 0. Repo & tooling

- [ ] Initialize Git repository
- [ ] Create `.gitignore` (Java, Node, IDE files)
- [ ] Add `.editorconfig` for consistent formatting
- [ ] Set up project structure (backend/, frontend/, infra/, scripts/)

## 1. Database (dev)

- [ ] Create `infra/docker-compose.dev.yml` with Postgres 16 + pgAdmin
- [ ] Create `infra/env/postgres.env` with database credentials
- [ ] Test database startup: `docker compose up -d`
- [ ] Verify pgAdmin access at `http://localhost:5050`

## 2. Backend (Spring Boot 3.3 / Java 21)

- [ ] Initialize Spring Boot project (Maven or Gradle)
- [ ] Add dependencies: Spring Web, Spring Data JPA, PostgreSQL driver, Flyway, Validation, Lombok
- [ ] Configure `application.yml` and `application-dev.yml`
- [ ] Create Flyway migration `V1__init.sql` with Patient and Doctor tables
- [ ] Implement Patient entity with JPA annotations
- [ ] Implement Doctor entity with JPA annotations
- [ ] Create PatientRepository (extends JpaRepository)
- [ ] Create DoctorRepository (extends JpaRepository)
- [ ] Implement PatientService with CRUD operations
- [ ] Implement DoctorService with CRUD operations
- [ ] Create PatientController with REST endpoints
- [ ] Create DoctorController with REST endpoints
- [ ] Configure CORS for frontend origin
- [ ] Add pagination support (Pageable)
- [ ] Add search/filtering capabilities
- [ ] Create ApiResponse wrapper for consistent responses
- [ ] Add global exception handler
- [ ] Test endpoints with Postman/curl
- [ ] Write unit tests for services
- [ ] Write integration tests for controllers

## 3. Frontend (Vite + React + Tailwind + TS)

- [ ] Initialize Vite + React + TypeScript project
- [ ] Install and configure Tailwind CSS
- [ ] Create `.env.example` with `VITE_API_BASE_URL`
- [ ] Create `lib/api.ts` fetch helper
- [ ] Set up React Router
- [ ] Create DataTable reusable component
- [ ] Create Form reusable component
- [ ] Implement PatientsList page with pagination
- [ ] Implement PatientForm page (create/edit)
- [ ] Implement PatientView page (detail view)
- [ ] Implement DoctorsList page with pagination
- [ ] Implement DoctorForm page (create/edit)
- [ ] Implement DoctorView page (detail view)
- [ ] Add search functionality to list pages
- [ ] Add loading states
- [ ] Add error handling and user feedback
- [ ] Style with Tailwind utilities
- [ ] Test UI interactions

## 4. Dev UX

- [ ] Create `scripts/dev-up.sh` to start all services
- [ ] Create `scripts/dev-down.sh` to stop all services
- [ ] Document environment setup in README
- [ ] Add troubleshooting section to README
- [ ] Test full dev workflow end-to-end

## 5. Quality gates

- [ ] Configure Spotless for backend (Google Java Format)
- [ ] Configure ESLint for frontend
- [ ] Configure Prettier for frontend
- [ ] Add pre-commit hooks (optional)
- [ ] Set up Vitest for frontend tests
- [ ] Ensure test coverage for critical paths
- [ ] Run linters and formatters
- [ ] Fix all warnings and errors

## 6. Stretch (optional this iteration)

- [ ] Add Testcontainers for integration tests
- [ ] Generate OpenAPI documentation
- [ ] Add API versioning
- [ ] Implement soft delete
- [ ] Add audit logging
- [ ] Create Docker production build
- [ ] Add health check endpoints
- [ ] Implement rate limiting
- [ ] Add request validation middleware
- [ ] Create seeder for demo data
