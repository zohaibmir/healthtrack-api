# **HealthTrack API**

A TypeScript-powered RESTful API for managing patient records, including CRUD operations, validation, and database integration using PostgreSQL and Prisma ORM.

* * *

## **Features**

-   Manage patient records with **Create, Read, Update, Delete (CRUD)** operations.
-   Schema-based validation using **class-validator**.
-   Integration with **PostgreSQL** using **Prisma ORM**.
-   Comprehensive **integration testing** using Jest.
-   Validation middleware for **DTOs (Data Transfer Objects)**.
-   Fully **containerized** using Docker and Docker Compose.
* * *

## **Technologies Used**

-   **Language**: TypeScript
-   **Framework**: Express.js
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Validation**: Class-validator
-   **Testing**: Jest, Supertest
-   **Containerization**: Docker & Docker Compose
* * *

## **Table of Contents**

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Prerequisites](#prerequisites)
-   [Setup Instructions](#setup-instructions)
-   [Environment Variables](#environment-variables)
-   [Database Models](#database-models)
-   [API Endpoints](#api-endpoints)
-   [Project Structure](#project-structure)
-   [Testing](#testing)
-   [Troubleshooting](#troubleshooting)
-   [Future Improvements](#future-improvements)
-   [License](#license)
* * *

## **Prerequisites**

Make sure you have the following installed on your system:

-   **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
-   **[Docker](https://www.docker.com/)**
-   **[Docker Compose](https://docs.docker.com/compose/)**
* * *

## **Setup Instructions**

### 1\. Clone the Repository

BASH

`git clone https://github.com/your-username/healthtrack.git cd healthtrack`

### 2\. Install Dependencies

BASH

`npm install`

### 3\. Set Up Docker Environment

Start the application and database services using Docker Compose:

BASH

`docker-compose up --build`

This will:

-   Start the API on **[http://localhost:3000](http://localhost:3000)**.
-   Spin up PostgreSQL containers for **production** and **testing** databases.
* * *

## **Environment Variables**

Create a `.env` file in the project root with the following content:

ENV

`# Server PORT=3000  # Database DATABASE_URL=postgres://postgres:password@postgres_prod:5432/patientdb  # Test Database TEST_DATABASE_URL=postgres://postgres_test:password@postgres_test:5432/test_patientdb`

> **Note**: These values should match the credentials in `docker-compose.yml`.

* * *

## **Database Models**

This project uses **Prisma ORM** to define and interact with the database. Below are the defined models:

### **Prisma Schema**

PRISMA

`generator client {   provider = "prisma-client-js" }  datasource db {   provider = "postgresql"   url      = env("DATABASE_URL") }  model Patient {   id             Int             @id @default(autoincrement())   name           String   dateOfBirth    DateTime   contactInfo    String   medicalHistory MedicalHistory[]   createdAt      DateTime        @default(now()) }  model MedicalHistory {   id        Int      @id @default(autoincrement())   condition String   patientId Int   patient   Patient  @relation(fields: [patientId], references: [id])   createdAt DateTime @default(now())   updatedAt DateTime @updatedAt }`

### **Model Overview**

1.  **Patient**
    -   Stores patient details like `name`, `dateOfBirth`, and `contactInfo`.
    -   Has a one-to-many relationship with `MedicalHistory`.
2.  **MedicalHistory**
    -   Stores medical conditions for a patient.
    -   Linked to the `Patient` model via `patientId` as a foreign key.
* * *

## **API Endpoints**

### **Base URL**: `http://localhost:3000/api/patients`

| Method | Endpoint | Description | Request Body |
| --- | --- | --- | --- |
| POST | `/` | Create a new patient | `{ name, dateOfBirth, contactInfo, medicalHistory }` |
| GET | `/` | Get all patients | \- |
| GET | `/:id` | Get a patient by ID | \- |
| PUT | `/:id` | Update a patient by ID | `{ name?, dateOfBirth?, contactInfo?, medicalHistory? }` |
| DELETE | `/:id` | Delete a patient by ID | \- |

### **Example Request**

#### **Create Patient**

HTTP

`POST /api/patients Content-Type: application/json {   "name": "John Doe",   "dateOfBirth": "1980-01-01",   "contactInfo": "123 Main St",   "medicalHistory": [     { "condition": "Diabetes" }   ] }`

#### **Response**

JSON

`{   "id": 1,   "name": "John Doe",   "dateOfBirth": "1980-01-01",   "contactInfo": "123 Main St",   "medicalHistory": [     { "id": 1, "condition": "Diabetes" }   ] }`

* * *

## **Project Structure**

TEXT

`healthtrack/ ├── src/ │   ├── api/ │   │   └── routes/           # API route definitions │   ├── config/               # Configuration (e.g., database, environment) │   ├── controllers/          # API controllers │   ├── dtos/                 # Data Transfer Objects (DTOs) │   ├── interfaces/           # Interfaces for types and repository patterns │   ├── middlewares/          # Middleware functions (e.g., validation, error handling) │   ├── repositories/         # Database access logic │   ├── services/             # Business logic │   ├── utils/                # Utility functions │   └── server.ts             # Application entry point ├── prisma/                   # Prisma schema and migrations ├── test/                     # Jest integration tests ├── docker-compose.yml        # Docker Compose configuration ├── Dockerfile                # Docker build configuration ├── package.json              # Node.js dependencies and scripts └── README.md                 # Project documentation`

* * *

## **Testing**

### 1\. Run Integration Tests

To run integration tests using Docker:

BASH

`docker-compose run test`

### 2\. Run Locally

If running tests locally, ensure the test database is running and execute:

BASH

`npm test`

### **Testing Overview**

-   **Validation Tests**: Ensure DTOs are validated correctly.
-   **Service Tests**: Test business logic for CRUD operations.
-   **Integration Tests**: Verify database interactions using Prisma.
* * *

## **Troubleshooting**

### 1. **Database Connection Issues**

-   Ensure Docker is running.
-   Verify the `DATABASE_URL` and `TEST_DATABASE_URL` in `.env` and `docker-compose.yml`.
-   Check database logs:

BASH

`docker logs postgres_prod`

### 2. **Prisma Client Errors**

-   Regenerate the Prisma client:

BASH

`npx prisma generate`

### 3. **Tests Failing**

-   Ensure the test database is running.
-   Reset the test database schema using:

BASH

`docker-compose run test`

* * *

## **Future Improvements**

-   Add **authentication and authorization** for secure API access.
-   Implement **pagination** for `GET /api/patients`.
-   Add **detailed logging** for debugging in production.
-   Enhance **error handling** with structured error codes.
* * *

## **Contact me**

GitHub: zohaibmir
Email: zohaib.mir@gmail.com

* * *

