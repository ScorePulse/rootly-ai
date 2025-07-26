This document describes the frontend application for the Rootly education platform, built with React, Vite, and TypeScript.

## Technologies Used

The frontend application leverages several key technologies:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **TypeScript**: A typed superset of JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Firebase**: Used for client-side authentication.
- **React Hot Toast**: For user-friendly notifications.

## Setup and Installation

To set up and run the application:

1.  Navigate into the `frontend` directory using `cd frontend`.
2.  Install dependencies with `npm install`.
3.  Create a `.env` file in the `frontend` directory and populate it with the `VITE_API_URL` for the backend connection, along with Firebase client SDK credentials (API key, auth domain, project ID, storage bucket, messaging sender ID, and app ID).

## Application Workflow

The application employs a context-based approach for authentication and routing.

### Authentication & Routing

- **Initial Load**: Upon opening, the application checks the user's authentication status. Logged-in users are routed to the Home Page (`/`), while unauthenticated users are directed to the Login Page (`/login`).
- **Login Page (`/login`)**: This serves as the landing page for unauthenticated users, allowing them to log in or switch to the registration form.
- **Protected Routes**: All routes, except for the Login Page, are protected. Attempts by unauthenticated users to access protected pages will result in a redirection to the Login Page.

### Available Routes

The application includes the following routes:

- `/`: Landing page.
- `/home`: Main dashboard for logged-in users.
- `/login`: Login page.
- `/register`: New user registration page.
- `/schedule`: Schedule page (Protected).
- `/plan`: Plan page (Protected).
- `/students`: Students page (Protected).
- `/setting`: Settings page (Protected).

### User Data Flow

- **Centralized State**: The `AuthContext` (`src/context/AuthContext.tsx`) centrally manages the authentication state, providing user information to all components.
- **User Creation**: Upon registration, a user account is created in Firebase Authentication on the client side. Subsequently, an ID token is sent to the backend for verification, leading to the creation of a corresponding user document in the Firestore database.
- **User Login**: When a user signs in, Firebase authentication handles the process on the client side, and the `AuthContext` stores the user's details.
