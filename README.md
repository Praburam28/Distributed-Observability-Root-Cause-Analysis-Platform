::: {align="center"}
🔭 Distributed Observability & Root-Cause Analysis Platform
A microservices observability platform for exploring distributed
traces, logs, metrics, service dependencies, alerts, and root-cause
diagnostics.
![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Messaging-FF6600?logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
:::
---
📌 Overview
The Distributed Observability & Root-Cause Analysis Platform is a
full-stack project designed to demonstrate how telemetry can be
collected and inspected across a distributed application. It brings
together API services for telemetry ingestion, trace processing, log
processing, metrics, dependency discovery, alerting, and diagnostic
workflows, with a web console for interacting with observability data.
The project includes sample business services---Order, Payment, and
Notification---to generate activity and explore service-to-service
behavior.
✨ Features
Dashboard overview --- review platform activity and
observability summaries.
Distributed tracing --- search traces and inspect individual
trace details.
Centralized logs --- query application logs and inspect
recurring patterns.
Metrics --- review service measurements and performance
information.
Service dependencies --- explore relationships between services.
Alerts and rules --- inspect alerts and manage supported alert
workflows.
Root-cause diagnostics --- examine diagnostic reports and
analyze traces.
Sample business services --- exercise Order, Payment, and
Notification flows.
JWT authentication --- authenticate API requests through the
gateway.
Interactive API documentation --- explore endpoints using
FastAPI Swagger UI.
Containerized environment --- run services and dependencies with
Docker Compose.
> Available endpoints and request schemas are defined by the running
> API. Use Swagger UI as the source of truth when testing requests.
🧰 Technology Stack
Area                         Technologies
---
Backend APIs                 Python, FastAPI, Pydantic
Frontend                     React, TypeScript, Vite
Database                     MySQL 8
Messaging                    RabbitMQ
Data access and migrations   SQLAlchemy, Alembic
API testing                  Swagger UI, Postman
Containers                   Docker, Docker Compose
🏗️ Architecture
``` text
                         ┌──────────────────────────┐
                         │      React Console       │
                         │      localhost:3000      │
                         └────────────┬─────────────┘
                                      │ HTTP
                         ┌────────────▼─────────────┐
                         │       API Gateway        │
                         │      localhost:8000      │
                         └────────────┬─────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            │                         │                         │
   ┌────────▼────────┐      ┌─────────▼────────┐      ┌─────────▼────────┐
   │ Ingestion       │      │ Query Service    │      │ Sample Services  │
   │ Service         │      │                  │      │ Order / Payment  │
   └────────┬────────┘      └─────────┬────────┘      │ Notification     │
            │                         │               └──────────────────┘
            ▼                         │
      ┌───────────┐                   │
      │ RabbitMQ  │                   │
      └─────┬─────┘                   │
            │                         │
   ┌────────┼───────────────┐          │
   ▼        ▼        ▼      ▼          ▼
 Traces    Logs    Metrics  RCA ◄── Service data
   │        │        │      │
   └────────┴────────┴──────┘
            │
       ┌────▼────┐
       │  MySQL  │
       └─────────┘
```
Logical overview only; actual service communication and data ownership
are defined in `docker-compose.yml` and each service's configuration.
📋 Prerequisites
Install the following before starting:
Docker Desktop
with Docker Compose
Git (for cloning the repository)
A modern browser
Optional: MySQL
Workbench to inspect
database schemas and records
Optional: Postman to test APIs
🚀 Getting Started
1. Clone the repository
``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Distributed-Observability-Platform
```
Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your GitHub repository URL.
2. Create the environment file
In PowerShell:
``` powershell
Copy-Item .env.example .env
```
If `.env` already exists, keep it and edit it instead of overwriting it.
Open `.env` and configure the passwords and secrets, including:
`MYSQL_ROOT_PASSWORD`
Database service passwords
`RABBITMQ_USER` and `RABBITMQ_PASSWORD`
`INTERNAL_API_TOKEN`
`INGESTION_API_KEY` / `INGEST_API_KEYS`
`JWT_SECRET`
`SEED_ADMIN_PASSWORD`, `SEED_OPERATOR_PASSWORD`, and
`SEED_VIEWER_PASSWORD`
Use strong, unique values. Do not commit `.env` or share its secrets
publicly.
3. Validate the Compose configuration
``` powershell
docker compose config --quiet
```
If the command completes without an error, the Compose configuration is
valid.
4. Build and start the platform
``` powershell
docker compose up -d --build
```
The first startup may take several minutes while Docker downloads base
images and builds the application services.
5. Check service status
``` powershell
docker compose ps
```
View logs for all services:
``` powershell
docker compose logs --tail=100
```
Follow API gateway logs:
``` powershell
docker compose logs -f api-gateway
```
Press `Ctrl+C` to stop following logs; this does not stop the
containers.
🌐 Local URLs
Component                    URL
---
Web console                  http://localhost:3000
API Gateway Swagger UI       http://localhost:8000/docs
API Gateway OpenAPI schema   http://localhost:8000/openapi.json
RabbitMQ Management UI       http://localhost:15672
The RabbitMQ management UI uses the credentials configured through
`RABBITMQ_USER` and `RABBITMQ_PASSWORD`. URLs are available only when
the corresponding services are running and healthy.
🔐 Authentication
Open Swagger UI.
Find `POST /api/v1/auth/login`.
Click Try it out.
Enter the `admin` username and the password configured as
`SEED_ADMIN_PASSWORD` in `.env`.
Click Execute and copy the returned access token.
Click Authorize in Swagger and provide the token in the format
requested by the dialog.
Try the protected endpoints.
The project also defines operator and viewer seed passwords through
`.env`. Use the configured values rather than assuming a default
password. Changing a seed password may not reset an account that already
exists in the database.
🧪 Testing the APIs
Recommended first checks:
Authenticate using the login endpoint.
Request the dashboard overview.
Inspect the available traces and trace details.
Query logs and metrics.
Inspect service dependencies.
Review alerts and diagnostic reports.
Generate sample business traffic, then query observability data
again.
Use the exact route parameters and JSON schemas shown in Swagger UI.
Some endpoints require authentication or particular roles. Empty results
can be expected before sample traffic has been generated and processed.
Postman
Import your Postman collection JSON into Postman:
Open Postman and click Import.
Select the collection JSON file.
Confirm the collection's `baseUrl` is `http://localhost:8000`.
Run the login request first.
Use the token for protected endpoints.
Review request bodies in Swagger before running write operations;
required fields may depend on the endpoint schema.
🗄️ Database
The platform uses MySQL 8 and creates separate databases for service
data. Depending on initialization, the configured database names
include:
`ingestion_db`
`trace_db`
`log_db`
`metrics_db`
`rca_db`
`gateway_db`
`order_db`
`payment_db`
`notification_db`
To inspect databases in MySQL Workbench, connect to the mapped local
MySQL port if you have enabled one in `docker-compose.yml`. For example,
if you configured `127.0.0.1:3307:3306`, use:
Host: `127.0.0.1`
Port: `3307`
Username: `root`
Password: the value of `MYSQL_ROOT_PASSWORD` in `.env`
The Compose configuration may not expose MySQL to the host by default.
Keep the internal container connection on `mysql:3306`; do not change it
to the host port.
To list databases in Workbench:
``` sql
SHOW DATABASES;
```
To inspect tables in a database:
``` sql
USE trace_db;
SHOW TABLES;
```
🛠️ Useful Docker Commands
Task                                        Command
---
Start all services                          `docker compose up -d`
Rebuild and start                           `docker compose up -d --build`
Check status                                `docker compose ps`
View all logs                               `docker compose logs -f`
View one service's logs                     `docker compose logs -f api-gateway`
Restart a service                           `docker compose restart api-gateway`
Stop services without removing containers   `docker compose stop`
Stop and remove containers/network          `docker compose down`
Data safety: Avoid `docker compose down -v` unless you intentionally
want to delete the named data volumes, which can remove persisted
database and RabbitMQ data.
🧯 Troubleshooting
Swagger UI does not open
``` powershell
docker compose ps
docker compose logs --tail=100 api-gateway
```
Confirm that the gateway is running and that port `8000` is not already
being used by another process.
Login returns `invalid_credentials`
Check the username and current `SEED_ADMIN_PASSWORD` in `.env`.
Inspect gateway logs.
Remember that changing `.env` may not update an existing database
account automatically.
Do not delete database volumes as a first troubleshooting step.
MySQL Workbench cannot connect
Confirm the MySQL container is running: `docker compose ps mysql`.
Ensure a host port mapping is configured if Workbench is connecting
from Windows.
Confirm the host and port match the mapping.
Use the root password from `.env`.
A dashboard panel is empty
Generate sample service traffic, wait for telemetry processing, then
refresh the dashboard. Verify the relevant service logs if data still
does not appear.
A service repeatedly exits
``` powershell
docker compose ps
docker compose logs --tail=100 <service-name>
```
Replace `<service-name>` with the failing service's Compose name.
🔒 Security Notes
Never commit `.env`, access tokens, or production credentials.
Change example passwords before exposing the application outside
your local machine.
Use a strong, unique `JWT_SECRET` and internal service tokens.
Do not expose MySQL or RabbitMQ management ports publicly.
Use HTTPS, restricted network access, and appropriate secret
management for deployments.
🗺️ Future Improvements
Potential extensions for the platform include:
More advanced telemetry visualizations and filtering
Additional alert notification channels
Expanded diagnostic explanations and correlation
Automated integration and load tests
Production deployment and monitoring configuration
👨‍💻 Author
Praburam R
📄 License
Add a `LICENSE` file and specify the license you intend to use before
presenting this repository as an openly licensed project.
---
::: {align="center"}
Built to explore distributed systems, observability, and root-cause
analysis.
⭐ If you find this project useful, consider giving the repository a
star.
:::
