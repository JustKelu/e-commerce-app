## 📦 Overview
This repository contains a **monorepo** for an **E-commerce system** with two main applications:

- **Website** → frontend + backend for the e-commerce site
- **Adminshell** → frontend + backend for the administrative panel
- **Database** → PostgreSQL managed with Docker

Everything is orchestrated with **Docker Compose**.

---

## 🗂 Project Structure
```
project/
├── apps/
│   ├── website/
│   │   ├── backend/   # Express backend
│   │   └── frontend/  # Frontend (Vite/React or similar)
│   ├── adminshell/
│   │   ├── backend/   # Express backend for admin panel
│   │   └── frontend/  # Static frontend served with live-server
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env
└── README.md
```

---

## ⚙️ Requirements
- **Docker** >= 20.x
- **Docker Compose** >= 2.x
- Node.js (only if you want to develop without Docker)

---

## 🚀 Development Setup

1. Create a `.env` file in the root directory with the required variables:
   ```env
   DB_HOST=database
   DB_PORT=5432
   DB_NAME=mydb
   DB_USER=myuser
   DB_PASSWORD=mypassword
   ```

2. Start the containers:
   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

3. Available services:
   - Website frontend → [http://localhost:3000](http://localhost:3000)
   - Website backend → [http://localhost:5002](http://localhost:5002)
   - Admin frontend → [http://localhost:8081](http://localhost:8081)
   - Admin backend → [http://localhost:5001](http://localhost:5001)
   - PostgreSQL Database → `localhost:5432`

---

## 🗄 Data Persistence
The database uses a **Docker volume** called `postgres_data`:
```yaml
database:
  volumes:
    - postgres_data:/var/lib/postgresql/data
```
➡️ This means data persists even after rebuilding containers.

If you want to reset the data:
```bash
docker compose -f docker-compose.dev.yml down -v
```

---

## 🔐 Security Notes
- **Never commit your `.env` files** → they are already excluded by `.gitignore`.
- Credentials remain local; only the project structure is published on GitHub.
- In production, always use strong credentials and avoid exposing the database directly to the internet.

---

## 🏗 Production Mode
The file `docker-compose.prod.yml` is currently **empty** and should be completed in the future. 
It may include optimized builds, reverse proxy with Nginx, and HTTPS certificates.

---

## 📜 Useful Commands
- Start development:
  ```bash
  docker compose -f docker-compose.dev.yml up --build
  ```
- Stop containers:
  ```bash
  docker compose -f docker-compose.dev.yml down
  ```
- Stop and remove containers + reset data:
  ```bash
  docker compose -f docker-compose.dev.yml down -v
  ```

---

## 📄 License
This project is licensed under the **Business Source License 1.1 (BSL 1.1)**.

- ✅ You may view and study the code.
- ✅ You may use it for personal, educational, or non-commercial purposes.
- ❌ Commercial use, including integrating this code into products for profit, is **not allowed without written permission** from the author.
- 📩 For commercial licensing requests, contact: **luca.oliva.dev@gmail.com**