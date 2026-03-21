# ITSA-5501 Project - Milestone 2

## Repository Structure
- frontend/
  - index.html
- docker/
  - docker-compose.yml
- Prometheus.yml
- README.md

## Workflow Description
1. Created a frontend page about a vacation destination.
2. Created docker-compose.yml with frontend, MongoDB, PostgreSQL, Redis, and Prometheus.
3. Added Prometheus.yml configuration.
4. Ran all containers using Docker Compose.
5. Verified frontend and Prometheus in browser.
6. Scaled frontend to 3 instances.

## Commands Used
- docker compose up -d
- docker compose ps
- docker compose up -d --scale frontend=3