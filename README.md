# 🛍️ Full-Stack E-Commerce App

Un progetto **full-stack** per la gestione di un e-commerce, sviluppato con **Node.js**, **Express**, **PostgreSQL**, **React**, **Vite** e **Context API**.

> 🚧 **Stato del progetto**: Work in Progress  
> Sto sviluppando questo progetto passo dopo passo, concentrandomi sulla creazione di un backend robusto e di un frontend scalabile.

---

## 📌 Funzionalità attuali

### **Backend**
- Registrazione e login utente con sessioni tramite **JWT**
- Sicurezza affidata ad **Helmet**
- Middleware per la validazione dei dati (**express-validator**)
- Architettura modulare con **controllers**, **services**, **repositories** e **middlewares**
- Hashing sicuro delle password con **bcrypt**
- Logging delle richieste con **Morgan**
- Gestione carrello, prodotti e utenti business/customer

### **Frontend**
- Struttura con **React + Vite**
- **React Context API** per l'autenticazione globale
- Componenti principali: Home, Login, Register
- Routing di base configurato

---

## 🚀 Tecnologie utilizzate

**Frontend**
- React + Vite
- Context API
- React Router

**Backend**
- Node.js + Express
- PostgreSQL
- JWT
- Helmet
- Cors
- Express-validator
- Bcrypt
- Morgan

---

## 📂 Struttura del progetto

```
e-commerce/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🛠️ Requisiti

- [Node.js](https://nodejs.org/) (consigliato v18+)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## ⚡ Come avviare il progetto

### 1. Clona il repository

```bash
git clone https://github.com/JustKelu/e-commerce.git
cd e-commerce
```

### 2. Configura le variabili d'ambiente

Crea un file `.env` nella cartella `backend` e imposta le seguenti variabili:

```
JWT_SECRET=your_jwt_secret
PORT=5000
PSW_DB=your_postgres_password
```

### 3. Avvia il backend

```bash
cd backend
npm install
npm run dev
```

### 4. Avvia il frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📄 Esempio di rotta API

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 📃 .gitignore consigliato

```
# Node
node_modules/
.env

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

---

## 📝 Note

- **Non committare il file `.env`**: aggiungi `.env` a `.gitignore`.
- Se vuoi contribuire, apri una issue o una pull request!
- Il progetto è in fase di sviluppo: alcune funzionalità potrebbero cambiare o essere migliorate
