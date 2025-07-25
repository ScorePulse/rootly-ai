# Education Application

This is a monorepo for a mobile-first education application to help teachers manage students in multi-grade classrooms.

## Project Structure

- `frontend`: React application (Vite)
- `backend`: Node.js application (Express)

## Setup Instructions

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Docker (Optional)

You can also run the application using Docker.

1. Make sure you have Docker and Docker Compose installed.
2. Run the following command from the root directory:
   ```bash
   docker-compose up --build
   ```
This will start the frontend, backend, and a MongoDB instance.
