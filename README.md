# devHome

**devHome** is a web application designed to connect developers with similar interests, inspired by the swipe-and-match mechanics of Tinder. Developers can swipe right to match with like-minded peers, connect, collaborate on projects, and grow their skills together.

## 📁 Project Structure

```
devHome/
├── frontend/           # React Frontend Application
│   ├── public/         # Static assets
│   ├── src/            # Source code (Components, Pages, etc.)
│   ├── index.html      # Entry HTML file
│   └── vite.config.js  # Vite configuration
│
├── backend/            # Node.js + Express Backend
│   ├── src/            # Source code
│   │   ├── config/     # Configuration files (Database, etc.)
│   │   ├── models/     # Mongoose schemas/models
│   │   ├── routes/     # API route handlers
│   │   ├── utils/      # Helper functions (Validation, etc.)
│   │   ├── app.js      # Express app setup
│   │   └── server.js   # Server entry point
│   └── .env.example    # Environment variables template
│
└── README.md           # Project Documentation
```

## ⚙️ Architecture

The application follows a decoupled client-server architecture:

1.  **Frontend (React + Vite)**: Handles the user interface, routing, and user interactions. It communicates with the backend via HTTP requests.
2.  - **Backend (Node.js + Express)**: Serves as the REST API, handling business logic, authentication, and data processing.

- **Validation**: Centralized API-level validation using a dedicated `utils/validation.js` helper and the `validator` library.
- **Database (MongoDB)**: Stores user profiles, matches, projects, and chat history.

### Communication Flow

- The **Frontend** sends HTTP requests (GET, POST, PUT, DELETE) to the **Backend** API endpoints.
- The **Backend** processes these requests, interacts with **MongoDB**, and returns JSON responses.
- **CORS** is enabled on the backend to allow requests from the frontend development server.

## � API Endpoints

### User Management

- **POST `/signup`**: Register a new user.
    - _Validation_:
        - `firstname`: Required, min 2 chars, max 50 chars.
        - `emailid`: Required, must be a valid email format.
        - `password`: Required, must be a strong password (min 8 chars, including uppercase, lowercase, numbers, and symbols).
        - `age`: Optional, must be at least 18.
        - `gender`: Optional, must be 'male', 'female', or 'others'.
- **GET `/user`**: Fetch a user by their email ID (e.g., `/user?emailid=example@test.com`).
- **GET `/feed`**: Retrieve all users from the database.
- **POST `/user`**: Generic endpoint to create a new user (same validation as `/signup`).
- **PATCH `/user/:userId`**: Partially update user details.
    - _Validation_: Only `firstname`, `lastname`, and `gender` are allowed for updates. Other fields will trigger an error. Same field-level constraints apply.
- **PUT `/user/:userId`**: Fully update user details.
    - _Validation_: Restricted to `firstname`, `lastname`, and `gender` fields only. Same field-level constraints apply.
- **DELETE `/user/:userId`**: Remove a user from the system by their ID.

## �🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (Local or Atlas)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Copy `.env.example` to `.env`
    - Update `MONGODB_URI` if necessary.
4.  Start the server:
    ```bash
    npm start
    # or for development with auto-restart:
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    # or
    npm run dev
    ```

## 💡 Future Feature Ideas

- **Swipe Matching Logic**: Implement the core "swipe right" algorithm to match developers based on skills and interests.
- **Real-time Chat**: Use Socket.io to enable real-time messaging between matched developers.
- **Skill-based Matchmaking**: Advanced filtering and matching based on tech stack (e.g., React, Python, Rust).
- **Project Collaboration Spaces**: Shared workspaces for matched developers to brainstorm and manage projects.
