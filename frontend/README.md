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

## Available Scripts

-   **`npm run dev`**: Starts the development server with hot reloading.
-   **`npm run build`**: Compiles the TypeScript and React code into production-ready JavaScript files.
-   **`npm run preview`**: Starts a local server to preview the production build.
