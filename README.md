# UniComm

UniComm is a real-time messaging application built with a **micro-frontend architecture** using **Module Federation**, **MERN stack**, and **Socket.io**. It features user authentication, online status tracking, and real-time chat functionality.

## Tools & Frameworks Used

- **Frontend:** React.js, TailwindCSS, Daisy UI
- **Backend:** Node.js, Express.js, MongoDB
- **Real-time Communication:** Socket.io
- **Authentication:** JWT
- **State Management:** Zustand
- **Micro-Frontend Architecture:** Module Federation for independent deployments

## Architecture Overview

UniComm consists of four main components:

1. **Host App (Port 3001)** – Manages shared components, routing, and design system.
2. **Chat App (Port 3002)** – Handles real-time messaging with Socket.io.
3. **Mail App (Port 3003)** – Manages email composition and organization.
4. **Backend (Port 3000)** – Provides authentication, database access, and WebSocket support.

## Key Architectural Decisions & Trade-offs

- **Micro-Frontend Architecture**

  - **Pros:** Enables independent deployments, modular development, and scalability.
  - **Cons:** Increased complexity in managing inter-app communication.

- **State Management with Zustand**

  - **Pros:** Lightweight, efficient, and easy to integrate.
  - **Cons:** Lacks built-in middleware support compared to Redux.

- **Real-time Messaging with Socket.io**
  - **Pros:** Low latency, bi-directional communication.
  - **Cons:** Requires additional backend and client-side event management.

## Installation & Setup

### 1. **Clone the Repository**

```sh
git clone https://github.com/adityaranacs/micro-frontend-project.git
cd unicomm
```

2. **Install Dependencies**

- Run the provided run.sh script to automatically install dependencies for all apps:

  ````sh
  bash run.sh
  ````

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env` in each directory and update values accordingly.
4. **Build & Run Applications**

   ```sh
   # For Host, Chat, and Mail apps
   npm run build && npm run serve

   # For Backend
   npm run dev
   ```

## Deployment

1. Build and deploy each micro-frontend separately.
2. Deploy the backend to a cloud provider.
3. Host each frontend on a subdomain and configure CORS.
