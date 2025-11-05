# EpiSanté Project Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **Java JDK**: Version 21 ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Docker Desktop** (optional, if using containerization)

---

## Environment Setup

### 1. Java Configuration (Windows)

Set Java 21 as your default version:

1. **Open Environment Variables:**
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"

2. **Set JAVA_HOME:**
   - Under "User variables", click "New"
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Java\jdk-21`
   - Click OK

3. **Update PATH:**
   - Find "Path" in User variables
   - Click "Edit" → "New"
   - Add: `%JAVA_HOME%\bin`
   - Move it to the top using "Move Up"
   - Click OK on all windows

4. **Verify Installation:**
   ```bash
   java -version
   ```
   Should display Java 21.

---

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd episante-crud
```

### 2. Frontend Setup (React + Vite + TypeScript)

Navigate to the frontend directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Critical: Ensure Correct Tailwind CSS Version

The project uses **Tailwind CSS v3**. If you encounter PostCSS errors, run:

```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3 postcss autoprefixer
```

#### Verify Configuration Files

Ensure these files exist with correct content:

**`postcss.config.cjs`:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**`tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**`src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Run Development Server

```bash
npm run dev
```

The app should run on `http://localhost:3000`

---

### 3. Backend Setup (Spring Boot)

Navigate to the backend directory:

```bash
cd ../backend
```

#### Install Dependencies

```bash
./mvnw clean install
# Or on Windows:
mvnw.cmd clean install
```

#### Run Backend Server

```bash
./mvnw spring-boot:run
# Or on Windows:
mvnw.cmd spring-boot:run
```

The API should run on `http://localhost:8080`

---

## Common Issues & Solutions

### Issue: Tailwind CSS Not Applying

**Symptoms:** Webpage looks unstyled, no colors or spacing.

**Solution:**
1. Verify Tailwind v3 is installed:
   ```bash
   npm list tailwindcss
   ```
   Should show `tailwindcss@3.x.x`

2. If v4 is installed, downgrade:
   ```bash
   npm uninstall tailwindcss
   npm install -D tailwindcss@^3 postcss autoprefixer
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

### Issue: Java Version Mismatch

**Symptoms:** Backend fails to start with Java version errors.

**Solution:**
1. Check current Java version:
   ```bash
   java -version
   ```

2. If not Java 21, follow the Java Configuration steps above.

### Issue: Port Already in Use

**Frontend (Port 3000):**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Backend (Port 8080):**
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F
```

---

## Project Structure

```
episante-crud/
├── frontend/               # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Tailwind imports
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.cjs
│
└── backend/               # Spring Boot
    ├── src/
    ├── pom.xml
    └── mvnw
```

---

## Development Workflow

1. **Always pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Install/update dependencies if needed:**
   ```bash
   cd frontend && npm install
   cd ../backend && ./mvnw clean install
   ```

3. **Run both servers:**
   - Terminal 1: `cd frontend && npm run dev`
   - Terminal 2: `cd backend && ./mvnw spring-boot:run`

4. **Before committing:**
   - Test your changes
   - Run linting: `npm run lint` (if configured)
   - Commit with clear messages

---

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling
- **React Router** - Routing

### Backend
- **Spring Boot 3.x** - Java framework
- **Java 21** - Programming language
- **Maven** - Dependency management

---

## Getting Help

If you encounter issues not covered here:

1. Check if someone else had the same issue in the team chat
2. Review error messages carefully
3. Search the error in the project's issue tracker
4. Ask the team for help with specific error details

---

## Package Versions (Reference)

```json
{
  "dependencies": {
    "react": "^18.3.x",
    "react-dom": "^18.3.x",
    "react-router-dom": "^6.x.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.x",
    "postcss": "^8.x.x",
    "autoprefixer": "^10.x.x",
    "typescript": "^5.x.x",
    "vite": "^6.x.x"
  }
}
```

**Important:** Always use Tailwind CSS v3, NOT v4 (which is in alpha).