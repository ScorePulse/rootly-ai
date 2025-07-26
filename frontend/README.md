# Frontend Application

This directory contains the frontend of the Rootly education application, built with React, Vite, and TypeScript.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Firebase:** Used for client-side authentication.
- **React Hot Toast:** For user-friendly notifications.

## Setup and Installation

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the `frontend` directory and add the following variables. These are required to connect to the backend and Firebase.

    ```env
    VITE_API_URL=http://localhost:5000/api

    # Firebase Client SDK Credentials
    VITE_FIREBASE_API_KEY="your-api-key"
    VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
    VITE_FIREBASE_APP_ID="your-app-id"
    ```

## Application Workflow

This application uses a robust, context-based approach to manage authentication and routing.

### 1. Authentication & Routing

- **Initial Load:** When a user opens the application, their authentication status is checked.
  - If the user is **logged in**, they are automatically routed to the Home Page (`/`).
  - If the user is **not logged in**, they are routed to the Login Page (`/login`).
- **Login Page (`/login`):** This is the landing page for unauthenticated users. From here, a user can either log in with existing credentials or switch to the registration form to create a new account.
- **Protected Routes:** All pages except for the Login Page are protected. If an unauthenticated user tries to access a protected page, they will be redirected to the Login Page.

### 2. Available Routes

- `/`:Landing page for the application.
- `/home`: The main dashboard or home page for logged-in users.
- `/login`: The login page (sign in).
- `/register`: The new user register page ( sign up).
- `/schedule`: The schedule page (Protected).
- `/plan`: The plan page (Protected).
- `/students`: The students page (Protected).
- `/setting`: The settings page (Protected).

### 3. User Data Flow

- **Centralized State:** The authentication state is managed globally by the `AuthContext` (`src/context/AuthContext.tsx`). This provides the current user's information to all components.
- **User Creation:** When a user registers, their account is created in Firebase Authentication on the client side. Immediately after, a request is sent to the backend with the user's ID token. The backend verifies this token and creates a corresponding user document in the Firestore database.

## Available Scripts

- **`npm run dev`**: Starts the development server with hot reloading.
- **`npm run build`**: Compiles the TypeScript and React code into production-ready JavaScript files.
- **`npm run preview`**: Starts a local server to preview the production build.
