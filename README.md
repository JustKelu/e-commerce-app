# 🛍️ Full-Stack E-Commerce App

Un progetto **full-stack** per la gestione di un e-commerce, sviluppato con **Node.js**, **Express**, **PostgreSQL**, **React**, **Vite** e **Context API**.

> 🚧 **Stato del progetto**: Work in Progress \
> Sto sviluppando questo progetto passo dopo passo, concentrandomi sulla creazione di un backend robusto e di un frontend scalabile.

---

## 📌 Funzionalità attuali
### **Backend**
- Registrazione e login utente con sessioni in **Json Web Token** 
- Sicurezza affidata ad **Helmet** 
- Middleware per la validazione dei dati (**express-validator**) 
- Architettura modulare con **controllers**, **services**, **repositories** e **middlewares** 
- Hashing sicuro delle password con **bcrypt** 
- Logs affidati a **Morgan**

### **Frontend** 
- Struttura con **React + Vite** 
- **React Context API** per l'autenticazione globale 
- Componenti principali: 
  - Home 
  - Login / Register 
- Routing di base configurato

---

## 🚀 Tecnologie utilizzate 
**Frontend** 
- React + Vite 
- Context API 
- Router 
- JSX 

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

e-commerce-app/ \
├── backend/ \
│ ├── controllers/ \
│ ├── services/ \
│ ├── repositories/ \
│ ├── middlewares/ \
│ ├── routes/ \
│ └── server.js \
├── frontend/ \
│ ├── src/ \
│ │ ├── components/ \
│ │ ├── context/ \
│ │ ├── App.jsx \
│ │ └── main.jsx \
│ └── vite.config.js \
└── README.md 

--- 

## ⚡ Come avviare il progetto

### **1. Clonare il repository**

- git clone https://github.com/JustKelu/e-commerce-app.git 
- cd e-commerce-app

### **2. Variabili di ambiente**
- Crea un file .env nella cartella backend   
- Impostare al suo interno le seguenti variabili: 
  - JWT_SECRET per la creazione dei token 
  - PORT per l'avvio del server 
  - PSW_DB (La stessa usata nella registrazione a postgre) 

### **3. Avviare il backend**

- cd backend 
- npm install 
- npm run dev 

### **4. Avviare il frontend**

- cd frontend 
- npm install 
- npm run dev