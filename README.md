# Activity Feed & Notifications System

A mini GitHub/LinkedIn-style **activity feed + real-time notifications** system.

Users perform actions (like, comment, follow, purchase), which generate immutable events.
Events are delivered via:
- **Feed (pull model)** with cursor pagination
- **Notifications (push model)** using Server-Sent Events (SSE)
- **Polling fallback** for unreliable clients
- **Near real-time analytics** 

---

## Features

- Event ingestion API
- Cursor-based, stable feed pagination
- Real-time notifications (SSE)
- Polling fallback for notifications
- Sliding window analytics (1m / 5m / 1h)
- Frontend demo (React) to visualize feed & notifications
- Local runnable setup

---

## Tech Stack

**Backend**
- Node.js + TypeScript
- Express
- SQLite
- Server-Sent Events (SSE)

**Frontend**
- React + Vite + TypeScript

---

## Running Locally

### Backend

- npm install
- npm run dev

---

### Frontend
- cd frontend
- npm install
- npm run dev
