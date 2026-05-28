# COMPILATION OF MY REACT PRACTICES AND PROJECTS

EACH PRATICES IN THIS REACT APPLICATION HAS A SEPERATE PAGE FOR ITS OWN LOGIC

# 1 TodoList App — Frontend

a simple todolist app that portrays all the basic crud operation
like update, read, delete and also implementation of searching, ordering and filtering

# 2 Real-Time Chat Application — Frontend

A modern real-time chat frontend built with React.

This application provides a responsive user interface for messaging, authentication, conversation management, and real-time communication powered by WebSockets.

---

## Architecture Overview

The frontend communicates with the Django backend using:

- REST APIs for persistence and authentication
- WebSockets for real-time communication

Backend Repository:

- Built with Django + Django Channels
- Handles APIs, authentication, persistence, and real-time broadcasting

---

## Tech Stack

- React
- JavaScript
- WebSockets
- Context API / State Management
- CSS / Modern UI Design

---

## Core Features

- User authentication
- Real-time messaging
- Conversation management
- Persistent chat history
- Offline message loading
- Responsive modern interface
- WebSocket-based communication

---

## Frontend Responsibilities

The frontend is responsible for:

- Rendering the user interface
- Managing user sessions
- Maintaining WebSocket connections
- Displaying real-time updates
- Sending messages to backend APIs
- Loading historical messages

---

## Application Flow

### Authentication Flow

1. User logs in via REST API
2. JWT token is stored
3. User session is initialized
4. WebSocket connection is established

---

### Messaging Flow

1. User sends a message
2. Frontend calls backend API
3. Backend persists the message
4. Backend broadcasts event via WebSocket
5. Receiver gets instant UI update

---

## Project Structure

```bash
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── websocket/
│   ├── context/
│   ├── hooks/
│   └── utils/
│
├── public/
└── package.json
```

---

## WebSocket Integration

The frontend maintains persistent WebSocket connections for:

- Receiving messages instantly
- Presence updates
- Real-time conversation synchronization

Each authenticated user connects to their dedicated communication room managed by the backend.

---

## Running the Project

### Clone Repository

```bash
git clone https://github.com/mike0001-prog/my-react-pratices.git
cd frontend
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/main
REACT_APP_WS_URL=ws://127.0.0.1:8000/ws/main/
```

---

### Start Development Server

```bash
npm start
```

---

## Relationship With Backend

This frontend depends on the Django backend for:

### REST APIs

- Authentication
- Conversation retrieval
- Message persistence
- User management

### WebSockets

- Real-time communication
- Instant message delivery
- Presence management

---

## Design Goals

The frontend was designed with focus on:

- Responsive UI/UX
- Real-time responsiveness
- Clean component architecture

---

## Future Improvements

- Message notifications
- Dark mode
- Typing indicators
- Read receipts
- Media sharing
- Push notifications

---

## License

MIT License
