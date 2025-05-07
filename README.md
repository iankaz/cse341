# Contacts API

A RESTful API for managing contacts, built with Node.js, Express, and MongoDB.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### GET /api/contacts
Returns all contacts in the database.

### GET /api/contacts/:id
Returns a single contact by ID.

## Deployment

This API is deployed on Render. The environment variables are configured in the Render dashboard. 