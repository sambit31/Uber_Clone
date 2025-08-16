# UBER_Clone Backend Development Workflow

This document outlines the step-by-step workflow followed during the development of the backend for the UBER_Clone project.

## 1. Project Initialization
- Created a new project directory: `UBER_Clone/Backend`.
- Initialized a Node.js project with `npm init`.
- Created a `.gitignore` file to exclude `node_modules` and environment files.
- Installed required dependencies (e.g., Express, Mongoose, dotenv, nodemon).

## 2. Project Structure Setup
- Created the following folder structure:
  - `controllers/` — for controller logic
  - `db/` — for database connection
  - `models/` — for Mongoose models
  - `routes/` — for API route definitions
  - `services/` — for business logic/services
  - `middlewares/` — for Express middleware (e.g., authentication)
- Added main files: `app.js`, `server.js`, `constants.js`, `.env`, and `package.json`.

## 3. Environment Configuration
- Created a `.env` file to store environment variables (e.g., database URI, port).
- Used `dotenv` to load environment variables in the application.

## 4. Database Setup
- Set up MongoDB connection in `db/db.js` using Mongoose.
- Defined the user schema and model in `models/user.model.js`.
- Added a blacklist token model in `models/blacklistToken.model.js` for handling token invalidation (e.g., logout, security).

## 5. User & Captain Module Implementation
- Created user-related business logic in `services/user.service.js` and captain-related logic in `services/captain.service.js`.
- Implemented user controller functions in `controllers/user.controllers.js` and captain controller functions in `controllers/captain.controllers.js`.
- Defined user routes in `routes/user.routes.js` and captain routes in `routes/captain.routes.js`, connecting them to their respective controllers.
- User registration endpoint (`/user/register`) expects `firstname`, `lastname`, `email`, and `password` in the request body, and constructs the `fullname` object for the user model.
- Captain registration endpoint (`/captain/register`) expects `fullname.firstname`, `fullname.lastname`, `email`, `password`, and nested `vehicle` fields in the request body.
- Both user and captain login endpoints include improved error handling, consistent response structure, and remove the password from the user/captain object before sending it in the response.
- All endpoints now use try-catch for error handling and return clear success/error messages and status codes.
- Added authentication middleware in `middlewares/auth.middleware.js` for protecting routes and handling JWT verification for both user and captain.

## 6. Application Setup
- Configured Express app in `app.js` (middleware, routes, error handling).
- Set up the server entry point in `server.js` to start the application.

## 7. Running the Application
- Used `nodemon` for development to auto-restart the server on file changes.
- Started the backend server with `npx nodemon` or `node server.js`.

## 8. Version Control
- Used Git for version control, committing changes at each major step.

---

## 9. Endpoint Documentation
- Added `USER_REGISTER_ENDPOINT.md` to document the `/user/register` endpoint, including required fields, example requests/responses, and error codes.
- Added `CAPTAIN_REGISTER_ENDPOINT.md` to document the `/captain/register` endpoint, including required fields, example requests/responses, and error codes.

## 10. Additional Features
- Added `models/blacklistToken.model.js` for token blacklisting (logout/security).
- Added `middlewares/auth.middleware.js` for authentication and route protection.

---

This workflow provides a clear overview of the backend setup, feature updates, and development process for the UBER_Clone project. All new features and improvements are documented for easy reference.
