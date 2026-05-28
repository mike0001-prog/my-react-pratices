# React Practices & Projects Frontend

A collection of frontend practices and mini-projects built with **React**.

This repository serves as a centralized workspace where each practice/project is implemented on its **own dedicated page with isolated logic**, making experimentation, learning, and scalability easier.

The goal of this repository is to explore:

- React architecture
- State management
- Component design patterns
- API integration
- Real-time communication
- Frontend scalability
- UI/UX patterns
- Performance optimization

---

# Project Philosophy

Each practice/project in this repository follows a **modular frontend architecture**:

- Dedicated pages for each practice
- Separated business logic
- Reusable components
- Independent state handling
- Scalable folder organization

This structure makes it easier to:

- Add new frontend practices
- Experiment with different frontend concepts
- Keep project logic maintainable
- Scale UI architecture over time

---

# Frontend Practices & Projects

## 1. TodoList App

A simple TodoList application built to demonstrate fundamental CRUD operations.

### Features

- Create todos
- Read todos
- Update todos
- Delete todos
- Searching
- Ordering
- Filtering

### Concepts Practiced

- React state management
- CRUD operations
- List rendering
- Search and filtering logic
- UI state updates

---

## 2. Real-Time Chat Application

A modern real-time chat frontend built with React.

This module provides a responsive user interface for:

- Messaging
- Authentication
- Conversation management
- Real-time communication
- Persistent chat synchronization

---

### Architecture Overview

The frontend communicates with a Django backend using:

#### REST APIs

Used for:

- Authentication
- Persistence
- Conversation retrieval
- Historical message loading

#### WebSockets

Used for:

- Real-time communication
- Presence updates
- Instant event synchronization

Backend responsibilities include:

- Authentication
- Persistence
- Real-time broadcasting
- WebSocket room management

---

### Tech Stack

- React
- JavaScript
- WebSockets
- Context API / State Management
- CSS / Modern UI Design

---

### Core Features

- User authentication
- Real-time messaging
- Conversation management
- Persistent chat history
- Offline message loading
- Responsive UI
- WebSocket communication

---

### Frontend Responsibilities

The frontend is responsible for:

- Rendering UI components
- Managing user sessions
- Maintaining WebSocket connections
- Displaying real-time updates
- Sending requests to backend APIs
- Loading persisted data

---

### Application Flow

#### Authentication Flow

1. User logs in through REST API
2. JWT token is stored
3. Session state initializes
4. WebSocket connection is established

---

#### Messaging Flow

1. User sends a message
2. Frontend calls backend API
3. Backend persists message
4. Backend broadcasts WebSocket event
5. Receiver gets instant UI update

---

### WebSocket Integration

Persistent WebSocket connections are maintained for:

- Real-time message delivery
- Presence updates
- Conversation synchronization

Each authenticated user connects to a dedicated communication room managed by the backend.

---

# Project Structure

```bash
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── API.js
│
│
├── public/
└── package.json
```

---

# Running the Project

## Clone Repository

```bash
git clone https://github.com/mike0001-prog/my-react-pratices.git
cd my-react-pratices
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/main
REACT_APP_WS_URL=ws://127.0.0.1:8000/ws/main/
```

---

## Start Development Server

```bash
npm start
```

---

# Relationship With Backend

This frontend communicates with the Django backend repository using:

## REST APIs

Used for:

- Authentication
- Data persistence
- Conversation retrieval
- Message synchronization

## WebSockets

Used for:

- Real-time communication
- Presence management
- Instant updates

Together, the frontend and backend form a full-stack architecture for experimentation with scalable application patterns.

---

# Design Goals

This repository is built with focus on:

- Clean UI architecture
- Component reusability
- Responsive design
- Real-time responsiveness
- Maintainable state management
- Scalable frontend patterns

---

# License

MIT License
