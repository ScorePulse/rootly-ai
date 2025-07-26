# Backend Application

This directory contains the backend of the Rootly education application, built with Node.js, Express, and TypeScript.

## Technologies Used

- **Node.js:** A JavaScript runtime for building server-side applications.
- **Express:** A minimal and flexible Node.js web application framework.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB:** A NoSQL database for storing application data.
- **Firebase Admin SDK:** Used for secure backend authentication and user management.
- **`ts-node`:** For running TypeScript directly in a Node.js environment during development.

## Setup and Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the `backend` directory and add the following variables. These are required to connect to the database and Firebase.

    ```env
    PORT=5000
    MONGO_URI=your-mongodb-connection-string

    # Firebase Admin SDK Credentials
    FIREBASE_TYPE="service_account"
    FIREBASE_PROJECT_ID="your-project-id"
    FIREBASE_PRIVATE_KEY_ID="your-private-key-id"
    FIREBASE_PRIVATE_KEY="your-private-key"
    FIREBASE_CLIENT_EMAIL="your-client-email"
    FIREBASE_CLIENT_ID="your-client-id"
    FIREBASE_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
    FIREBASE_TOKEN_URI="https://oauth2.googleapis.com/token"
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
    FIREBASE_CLIENT_X509_CERT_URL="your-client-x509-cert-url"
    ```

## Available Scripts

-   **`npm run dev`**: Starts the development server with `nodemon` and `ts-node` for hot reloading.
-   **`npm run build`**: Compiles the TypeScript code into JavaScript, outputting it to the `dist` directory.
-   **`npm run start`**: Starts the production server by running the compiled JavaScript from the `dist` directory.
