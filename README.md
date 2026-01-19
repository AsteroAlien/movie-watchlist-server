# 🎬 Movie Watchlist Server API

A RESTful backend API for managing user movie watchlists.  
The server provides secure user authentication, protected routes, and full CRUD functionality for watchlist items. It is built with Node.js and Express, uses Prisma as the ORM 
layer, and connects to a PostgreSQL database. The API enforces strong data validation with Zod, hashes passwords with bcrypt, and uses JSON Web Tokens (JWT) for authorization. 
The architecture is modular, scalable, and suitable for deployment in modern cloud environments.

---

## 🚀 Features

- User registration and login
- JWT-based authentication and route protection
- Secure password hashing with bcrypt
- Create, read, update, and delete watchlist items
- Request validation with Zod
- Prisma ORM with PostgreSQL
- Neon PostgreSQL database
- Environment-based configuration

---

## 🧱 Tech Stack

- Node.js
- Express.js
- Prisma
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt
- Zod
- pnpm

---

## 📁 Project Structure
movie-watchlist-server

- ├── prisma/
- │ ├── schema.prisma
- │ └── migrations/
- ├── src/
- │ ├── controllers/
- │ ├── routes/
- │ ├── middlewares/
- │ ├── validators/
- │ ├── utils/
- │ └── server.js
- ├── prisma.config.ts
- ├── .env
- ├── package.json
- └── pnpm-lock.yaml

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

- DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
- JWT_SECRET="your-secret-key"
- JWT_EXPIRES_IN="24h"
- NODE_ENV="development"
- PORT=5000

---

## 🛠️ Installation & Setup

Clone the repository.

Install dependencies:

- pnpm install

Generate Prisma client and run migrations:

- pnpm prisma generate
- pnpm prisma migrate dev

Start the development server:

- pnpm dev

---

## 🔑 Authentication

After registering or logging in, include the JWT in the request headers:

- Authorization: Bearer <your_jwt_token>

All watchlist routes require authentication.

---

## 📌 API Endpoints

### Auth
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`

### Watchlist
- GET `/watchlist`
- POST `/watchlist`
- PUT `/watchlist/:id`
- DELETE `/watchlist/:id`

### User 
- GET `/user`

### Movie
- GET `/movie`

### Home
- GET `/home`

## 🧪 Validation

All incoming requests are validated using Zod to ensure correct data types, required fields, and consistent error handling.

---

## 📄 License

MIT License
