# HealthTrack API

HealthTrack API is a TypeScript-powered RESTful API designed to manage patient records. It supports CRUD operations, validation, and seamless database integration using PostgreSQL and Prisma ORM.

---

## Features

- Perform **Create, Read, Update, Delete (CRUD)** operations on patient records.
- Schema-based validation powered by **class-validator**.
- Database integration using **PostgreSQL** and **Prisma ORM**.
- Comprehensive **integration testing** using Jest.
- Middleware for validating **DTOs (Data Transfer Objects)**.
- Fully **containerized** with Docker and Docker Compose for easy deployment.

---

## Technologies Used

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Class-validator
- **Testing**: Jest, Supertest
- **Containerization**: Docker & Docker Compose

---

## Table of Contents

1. Features
2. Technologies Used
3. Prerequisites
4. Setup Instructions
5. Environment Variables
6. Database Models
7. API Endpoints
8. Project Structure
9. Testing
10. Troubleshooting
11. Future Improvements
12. Contact Me

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (version 18 or higher recommended)
- **[Docker](https://www.docker.com/)**
- **[Docker Compose](https://docs.docker.com/compose/)**

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/healthtrack.git
cd healthtrack

### Step 2: Install Dependencies
BASH
npm install

### Step 3: Set Up Docker Environment
Start the application and database services using Docker Compose:

BASH
docker-compose up --build
This setup will:

Launch the API on http://localhost:3000.
Spin up PostgreSQL containers for production and testing databases.

Environment Variables
Create a .env file in the project root and add the following content:

PLAINTEXT
# Server
PORT=3000

# Database
DATABASE_URL=postgres://postgres:password@postgres_prod:5432/patientdb

# Test Database
TEST_DATABASE_URL=postgres://postgres_test:password@postgres_test:5432/test_patientdb
Note: Ensure these values match the credentials in docker-compose.yml.

Database Models
The API uses Prisma ORM to define and interact with the database. Below are the models:

Model Overview
Patient

Stores details such as name, dateOfBirth, and contactInfo.
Has a one-to-many relationship with MedicalHistory.
MedicalHistory

Stores medical conditions of patients.
Linked to the Patient model via the patientId foreign key.
API Endpoints
Base URL: http://localhost:3000/api/patients
Method	Endpoint	Description	Request Body
POST	/	Create a new patient	{ name, dateOfBirth, contactInfo, medicalHistory }
GET	/	Get all patients	-
GET	/:id	Get a patient by ID	-
PUT	/:id	Update a patient by ID	{ name?, dateOfBirth?, contactInfo?, medicalHistory? }
DELETE	/:id	Delete a patient by ID	-

Example Request
Create Patient
HTTP
POST /api/patients
Content-Type: application/json

{
  "name": "John Doe",
  "dateOfBirth": "1980-01-01",
  "contactInfo": "123 Main St",
  "medicalHistory": [
    { "condition": "Diabetes" }
  ]
}
Response
JSON
{
  "id": 1,
  "name": "John Doe",
  "dateOfBirth": "1980-01-01",
  "contactInfo": "123 Main St",
  "medicalHistory": [
    { "id": 1, "condition": "Diabetes" }
  ]
}
Project Structure
TEXT
healthtrack/
├── src/
│   ├── api/
│   │   └── routes/           # API route definitions
│   ├── config/               # Configuration (e.g., database, environment)
│   ├── controllers/          # API controllers
│   ├── dtos/                 # Data Transfer Objects (DTOs)
│   ├── interfaces/           # Interfaces for types and repository patterns
│   ├── middlewares/          # Middleware functions (e.g., validation, error handling)
│   ├── repositories/         # Database access logic
│   ├── services/             # Business logic
│   ├── utils/                # Utility functions
│   └── server.ts             # Application entry point
├── prisma/                   # Prisma schema and migrations
├── test/                     # Jest integration tests
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Docker build configuration
├── package.json              # Node.js dependencies and scripts
└── README.md                 # Project documentation
Testing
Step 1: Run Integration Tests
Run integration tests using Docker:

BASH
docker-compose run test
Step 2: Run Locally
If running tests locally, ensure the test database is running and execute:

BASH
npm test
Testing Overview
Validation Tests: Ensure DTOs are validated correctly.
Service Tests: Test business logic for CRUD operations.
Integration Tests: Verify database interactions using Prisma.
Troubleshooting
1. Database Connection Issues
Ensure Docker is running.
Verify the DATABASE_URL and TEST_DATABASE_URL in .env and docker-compose.yml.
Check database logs:
BASH
docker logs postgres_prod
2. Prisma Client Errors
Regenerate the Prisma client:
BASH
npx prisma generate
3. Tests Failing
Ensure the test database is running.
Reset the test database schema using:
BASH
docker-compose run test
Future Improvements
Add authentication and authorization for secure API access.
Implement pagination for GET /api/patients.
Add detailed logging for debugging in production.
Enhance error handling with structured error codes.

Contact Me
GitHub: zohaibmir
Email: zohaib.mir@gmail.com