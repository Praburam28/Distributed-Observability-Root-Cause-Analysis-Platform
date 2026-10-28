# Distributed Observability & Root-Cause Analysis Platform

A full-stack microservices observability platform for exploring distributed traces, application logs, metrics, service dependencies, alerts, and root-cause diagnostics.

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Messaging-FF6600?logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Access the Application](#access-the-application)
- [Authentication](#authentication)
- [Testing APIs](#testing-apis)
- [Database](#database)
- [Useful Docker Commands](#useful-docker-commands)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)
- [Author](#author)

## Overview

The **Distributed Observability & Root-Cause Analysis Platform** demonstrates how telemetry can be collected and inspected across a distributed application. It brings together APIs for telemetry ingestion, trace processing, log processing, metrics, dependency discovery, alerting, and diagnostic workflows, with a web console for interacting with observability data.

Sample business services—Order, Payment, and Notification—help generate application activity and explore service-to-service behavior.

## Features

- **Dashboard overview** — review platform activity and observability summaries.
- **Distributed tracing** — search traces and inspect individual trace details.
- **Centralized logs** — query application logs and inspect recurring patterns.
- **Metrics monitoring** — review service measurements and performance information.
- **Service dependencies** — explore relationships between services.
- **Alert management** — inspect alerts and use supported alert workflows.
- **Root-cause diagnostics** — examine diagnostic reports and analyze traces.
- **Sample business services** — exercise Order, Payment, and Notification flows.
- **JWT authentication** — authenticate API requests through the gateway.
- **Interactive API documentation** — explore endpoints using FastAPI Swagger UI.
- **Containerized environment** — run services and dependencies with Docker Compose.

> Available endpoints and request schemas are defined by the running API. Use Swagger UI as the source of truth when testing requests.

## Technology Stack

| Area | Technologies |
|---|---|
| Backend | Python, FastAPI, Pydantic |
| Frontend | React, TypeScript, Vite |
| Database | MySQL 8 |
| Messaging | RabbitMQ |
| Data access and migrations | SQLAlchemy, Alembic |
| API testing | Swagger UI, Postman |
| Containers | Docker, Docker Compose |

## Architecture

```text
                         +---------------------------+
                         |       React Console       |
                         |      localhost:3000        |
                         +-------------+-------------+
                                       |
                                       | HTTP
                         +-------------v-------------+
                         |        API Gateway        |
                         |      localhost:8000        |
                         +-------------+-------------+
                                       |
             +-------------------------+-------------------------+
             |                         |                         |
   +---------v---------+     +---------v---------+     +---------v---------+
   | Ingestion Service |     |   Query Service   |     | Sample Services   |
   |                   |     |                   |     | Order / Payment  |
   +---------+---------+     +---------+---------+     | Notification     |
             |                         |               +-------------------+
             v                         |
       +-----------+                   |
       |  RabbitMQ |                   |
       +-----+-----+                   |
             |                         |
     +-------+-----------+-------------+
     |                   |
+----v-----+       +-----v------+      +-------------+
| Trace    |       | Log        |      | Metrics /   |
| Service  |       | Service    |      | RCA Services|
+----+-----+       +-----+------+      +------+------+
     |                   |                    |
     +-------------------+--------------------+
                         |
                   +-----v-----+
                   |   MySQL   |
                   +-----------+
```

*This is a logical overview. Actual service communication and data ownership are defined in `docker-compose.yml` and each service's configuration.*

## Prerequisites

Install the following:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) with Docker Compose
- [Git](https://git-scm.com/) to clone the repository
- A modern web browser
- Optional: [MySQL Workbench](https://www.mysql.com/products/workbench/) to inspect database schemas and records
- Optional: [Postman](https://www.postman.com/) to test APIs

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Distributed-Observability-Platform
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Create the environment file

In PowerShell, run:

```powershell
Copy-Item .env.example .env
```

If `.env` already exists, keep it and edit it instead of overwriting it.

Open `.env` and configure the passwords and secrets, including:

- `MYSQL_ROOT_PASSWORD`
- Database service passwords
- `RABBITMQ_USER` and `RABBITMQ_PASSWORD`
- `INTERNAL_API_TOKEN`
- `INGESTION_API_KEY` and `INGEST_API_KEYS`
- `JWT_SECRET`
- `SEED_ADMIN_PASSWORD`, `SEED_OPERATOR_PASSWORD`, and `SEED_VIEWER_PASSWORD`

Use strong, unique values. Never commit `.env` or publish its secrets.

### 3. Validate the Docker Compose configuration

```powershell
docker compose config --quiet
```

If the command completes without an error, the Compose configuration is valid.

### 4. Build and start the platform

```powershell
docker compose up -d --build
```

The first startup may take several minutes while Docker downloads images and builds the application services.

### 5. Check service status

```powershell
docker compose ps
```

View recent logs from all services:

```powershell
docker compose logs --tail=100
```

Follow API gateway logs:

```powershell
docker compose logs -f api-gateway
```

Press `Ctrl+C` to stop following logs. The containers continue running.

## Access the Application

| Component | URL |
|---|---|
| Web console | [http://localhost:3000](http://localhost:3000) |
| API Gateway Swagger UI | [http://localhost:8000/docs](http://localhost:8000/docs) |
| API Gateway OpenAPI schema | [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json) |
| RabbitMQ Management UI | [http://localhost:15672](http://localhost:15672) |

These URLs work when the corresponding services are running and healthy.

The RabbitMQ Management UI uses the credentials configured through `RABBITMQ_USER` and `RABBITMQ_PASSWORD`.

## Authentication

1. Open [Swagger UI](http://localhost:8000/docs).
2. Find `POST /api/v1/auth/login`.
3. Click **Try it out**.
4. Enter username `admin` and the password configured as `SEED_ADMIN_PASSWORD` in `.env`.
5. Click **Execute** and copy the returned access token.
6. Click **Authorize** in Swagger and provide the token in the format requested by the dialog.
7. Try the protected endpoints.

The project also defines operator and viewer seed passwords through `.env`. Use your configured values instead of assuming a default password. Changing a seed password may not update an account that already exists in the database.

## Testing APIs

Recommended first checks:

1. Authenticate through the login endpoint.
2. Request the dashboard overview.
3. Inspect available traces and trace details.
4. Query logs and metrics.
5. Inspect service dependencies.
6. Review alerts and diagnostic reports.
7. Generate sample business traffic, then query observability data again.

Use the exact route parameters and JSON schemas shown in Swagger UI. Some endpoints require authentication or specific roles. Empty results can be expected before sample traffic has been generated and processed.

### Postman

To import the Postman collection:

1. Open Postman and click **Import**.
2. Select your Postman collection JSON file.
3. Confirm that `baseUrl` is `http://localhost:8000`.
4. Run the login request first.
5. Use the saved token for protected endpoints.

Review request bodies in Swagger before running write operations; required fields depend on the endpoint schema.

## Database

The platform uses MySQL 8 and creates separate databases for service data. Depending on initialization, the configured database names include:

- `ingestion_db`
- `trace_db`
- `log_db`
- `metrics_db`
- `rca_db`
- `gateway_db`
- `order_db`
- `payment_db`
- `notification_db`

The Compose configuration may not expose MySQL to Windows by default. If you added this port mapping under the `mysql` service:

```yaml
ports:
  - "127.0.0.1:3307:3306"
```

connect through MySQL Workbench using:

| Setting | Value |
|---|---|
| Host | `127.0.0.1` |
| Port | `3307` |
| Username | `root` |
| Password | Value of `MYSQL_ROOT_PASSWORD` in `.env` |

Keep the internal container connection on `mysql:3306`; do not change it to the host port.

List databases:

```sql
SHOW DATABASES;
```

Inspect tables:

```sql
USE trace_db;
SHOW TABLES;
```

## Useful Docker Commands

| Task | Command |
|---|---|
| Start services | `docker compose up -d` |
| Rebuild and start | `docker compose up -d --build` |
| Check status | `docker compose ps` |
| View all logs | `docker compose logs -f` |
| View gateway logs | `docker compose logs -f api-gateway` |
| Restart gateway | `docker compose restart api-gateway` |
| Stop services | `docker compose stop` |
| Stop and remove containers/network | `docker compose down` |

**Data safety:** Avoid `docker compose down -v` unless you intentionally want to delete the named data volumes. This can remove persisted database and RabbitMQ data.

## Troubleshooting

### Swagger UI does not open

```powershell
docker compose ps
docker compose logs --tail=100 api-gateway
```

Confirm the gateway is running and port `8000` is not being used by another process.

### Login returns `invalid_credentials`

- Check the username and current `SEED_ADMIN_PASSWORD` in `.env`.
- Inspect API gateway logs.
- Remember that changing `.env` may not update an existing database account automatically.
- Do not delete database volumes as the first troubleshooting step.

### MySQL Workbench cannot connect

- Confirm the MySQL container is running: `docker compose ps mysql`.
- Ensure a host port mapping is configured if Workbench connects from Windows.
- Confirm the host and port match the mapping.
- Use the root password from `.env`.

### Dashboard panels are empty

Generate sample service traffic, wait for telemetry processing, then refresh the dashboard. If data still does not appear, check the relevant service logs.

### A service repeatedly exits

```powershell
docker compose ps
docker compose logs --tail=100 <service-name>
```

Replace `<service-name>` with the failing service's Compose name.

## Security Notes

- Never commit `.env`, access tokens, or production credentials.
- Change example passwords before exposing the application outside your local machine.
- Use strong, unique `JWT_SECRET` and internal service tokens.
- Do not expose MySQL or RabbitMQ management ports publicly.
- Use HTTPS, restricted network access, and appropriate secret management for deployments.

## Author

**Praburam R**


## License

Add a `LICENSE` file and specify the license you intend to use before presenting this repository as an openly licensed project.

---

If you find this project useful, consider giving the repository a star.
