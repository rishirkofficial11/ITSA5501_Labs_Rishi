
# Helpdesk Ticket System — Docker Compose Demo

This project demonstrates a real-world **multi-container application** using Docker Compose. It simulates a **Helpdesk / Support Ticket System**.

---

## Overview

This system contains three services:

| Service | Description |
|---------|-------------|
| **API** | The front desk — users submit and view tickets |
| **Worker(s)** | Background support agents that resolve tickets |
| **Redis** | Acts as the inbox and queue for all tickets |

Learners can submit tickets, view processing logs, and scale workers to see how real systems handle increasing workloads.

---

## Project Structure

```
helpdesk-demo/
├─ docker-compose.yml
├─ api/
│  ├─ package.json
│  ├─ server.js
│  ├─ Dockerfile
│  ├─ .dockerignore
│  └─ public/index.html
└─ worker/
   ├─ package.json
   ├─ worker.js
   ├─ Dockerfile
   └─ .dockerignore
```

---

## Running the Application

### 1. Build the containers
```
docker compose build
```

### 2. Start the system
```
docker compose up -d
```

### 3. View running services
```
docker compose ps
```

Then open your browser:

http://localhost:8080

You can now:
- Submit helpdesk tickets
- View queue metrics
- Watch workers resolve tickets

---

## Viewing Logs

### Worker logs
```
docker compose logs -f worker
```

### API logs
```
docker compose logs -f api
```

---

## Scaling Workers

Add more support agents:
```
docker compose up -d --scale worker=4
```

Reduce workers:
```
docker compose up -d --scale worker=1
```

View running containers:
```
docker compose ps
```

---

## Useful Commands

Restart a service:
```
docker compose restart api
```

Open an interactive shell:
```
docker compose exec api sh
docker compose exec worker sh
```

Interact with Redis:
```
docker compose exec redis redis-cli ping
```

---

## Cleanup

Stop and remove containers:
```
docker compose down
```

Remove containers + volumes:
```
docker compose down -v
```

Remove containers + volumes + local images:
```
docker compose down --rmi local -v --remove-orphans
```

---

## Summary
This Helpdesk Ticket System demonstrates:
- Multi‑container coordination
- Background workers
- Real-time processing
- Logs & scaling
- Docker Compose fundamentals


