# Backend Assignment — Algosoft

This repository is a Node.js + Express backend implementing User, Subscription and Address management following clean-architecture principles.

**Tech Stack**

- Node.js (JavaScript)
- Express.js
- MongoDB + Mongoose
- Zod (request validation)
- JWT (authentication)
- bcrypt (password hashing)
- dotenv (environment configuration)

**Project Structure**

```text
src/
├── config/
│   ├── env.js
│   └── index.js
├── modules/
│   ├── auth/
│   ├── user/
│   ├── subscription/
│   └── address/
├── routes/
│   └── index.js
├── shared/
│   ├── constants/
│   ├── middlewares/
│   └── errors/
└── server.js
```

Architecture Principles

- Controller: handles HTTP layer and responses
- Service: business logic and domain rules
- Model: Mongoose schemas and DB access
- Validation: Zod schemas at API boundary
- Middleware: auth, RBAC, validation, error handling

Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC) with roles: `USER`, `ADMIN`
- All protected routes require a valid JWT

Module 1 — User Management

Features

- User registration
- User login (returns JWT)
- Fetch logged-in user profile
- Admin can activate / deactivate users

Key Design Decisions

- Tokens are generated on login
- Deactivated users cannot log in
- User status is checked on protected routes

Module 2 — Subscription Management

Plans

- FREE, MONTHLY, QUARTERLY, HALF_YEARLY, YEARLY, SPONSORED

Features

- Assign subscription to a user
- Update subscription plan
- Cancel subscription
- Auto-expire subscriptions (based on end date)
- Admin: view all user subscriptions

Design Notes

- Only one active subscription per user
- Subscriptions are never deleted (history preserved)
- Admin endpoint returns all subscriptions regardless of status

Module 3 — User Address Management

Features

- Add, edit, delete address
- Mark address as primary
- View all addresses for logged-in user

Rules Enforced

- Address ownership validated at service layer
- Only one primary address per user
- No hard limit on number of addresses

Module 4 — Advanced Address Filtering (Admin-only)

Filtering Options

- city, state, country, zipCode, isPrimary
- Multiple filters can be combined
- Case-insensitive searching
- Pagination (`page`, `limit`)
- Sorting by `city` or `state`

Example

GET /api/addresses/search?city=delhi&isPrimary=true&page=1&limit=5

Validation Strategy

- Zod used at request boundary
- Parsed / coerced values reassigned to `req.body`, `req.query`, `req.params`
- Query params explicitly coerced (booleans, numbers)

Error Handling

- Centralized error-handling middleware
- Consistent error response structure
- Zod validation errors formatted clearly
- Custom errors include HTTP status codes

Setup

1. Install dependencies

```bash
npm install
```

2. Copy and fill environment variables

```bash
cp .env.example .env
```

Run

- Development:

```bash
npm run dev
```

- Production:

```bash
npm start
```

Scripts

- `npm run dev` — start with `nodemon`
- `npm start` — run `node src/server.js`

Where to look for endpoints

- Module routes: `modules/*/*.routes.js`
- Central router: `routes/index.js`
- Auth middleware: `shared/middlewares/auth.middleware.js`
- Validation middleware: `shared/middlewares/validate.middleware.js`

API Documentation (Swagger)


- A built-in Swagger UI is mounted at `/api-docs` when the app is running (served by `swagger-ui-express`).
- Dependencies: `swagger-ui-express`, `swagger-jsdoc` (already added to `package.json`).
- To view documentation locally:

```bash
npm install
npm run dev
# then open http://localhost:<PORT>/api-docs
```.
