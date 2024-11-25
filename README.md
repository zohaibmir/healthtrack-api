# HealthTrack API

HealthTrack API is a backend application for managing patients and their medical histories. Built with **Node.js**, **TypeScript**, and **Prisma ORM**, it provides a RESTful API for healthcare-related operations. The application uses **PostgreSQL** for data persistence and supports both local and containerized deployments using Docker.

---

## **Features**

- 🩺 **Patient Management**: Create, retrieve, update, and delete patient records.
- 📋 **Medical History Management**: Manage medical history for each patient.
- 🛠️ **Prisma ORM**: Simplifies database modeling and querying.
- 🔍 **Robust Validation**: Input validation using `class-validator` and `class-transformer`.
- ✅ **Comprehensive Testing**: Integration and DTO validation tests using Jest.
- 🐳 **Docker Support**: Fully containerized for easy deployment and testing.

---

## **Technologies**

- **Node.js**: Backend runtime for building scalable applications.
- **TypeScript**: Strongly-typed JavaScript for better developer productivity.
- **Prisma ORM**: Database toolkit for schema management and queries.
- **PostgreSQL**: Relational database for structured data storage.
- **Jest**: Testing framework for integration and validation tests.
- **Docker**: Containerization for consistent deployment environments.

---

## **Getting Started**

Follow the steps below to set up and run the application.

---

### **1. Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- A running instance of **PostgreSQL** (if not using Docker)

---

### **2. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/healthtrack-api.git
cd healthtrack-api

---

### **3. Install Dependencies
Install all required Node.js dependencies:

BASH
npm install

4. Configure Environment Variables
Create a .env file in the root of your project and add the following variables:

ENV
# Application port
PORT=3000

# PostgreSQL database for the app
DATABASE_URL="postgresql://postgres:password@localhost:5432/patientdb?schema=public"

# Test database for Jest
TEST_DATABASE_URL="postgresql://postgres:test_password@localhost:5433/test_patientdb?schema=public"
Replace password and test_password with your actual PostgreSQL credentials.

5. Set Up the Database
If Running Locally:
Ensure PostgreSQL is running on your machine.

Apply the Prisma migrations to set up the database schema:

BASH
npx prisma migrate dev --name init
You can visualize and interact with the database using Prisma Studio:

BASH
npx prisma studio
If Using Docker:
Use the provided docker-compose.yml file to start the database services:
BASH
docker-compose up -d
This will spin up:
A PostgreSQL database for the app (patientdb) on port 5432.
A test database (test_patientdb) for Jest integration tests on port 5433.
6. Start the Application
Start the application in development mode:

BASH
npm run dev
The server will start at http://localhost:3000.

7. Run Tests (Optional)
The project includes comprehensive integration and validation tests using Jest.

To run all tests:

BASH
npm test
To run tests in watch mode:

BASH
npm run test:watch
To generate a test coverage report:

BASH
npm run test:coverage
The coverage report will be available in the coverage directory.

8. Build for Production (Optional)
If you want to build the application for production, run:

BASH
npm run build
The compiled files will be available in the dist directory.

9. Deploy Using Docker (Optional)
If you'd like to deploy the application using Docker, follow these steps:

Use the provided docker-compose.yml file to build and start the containers:

BASH
docker-compose up --build
This will:

Build the Node.js application.
Start a PostgreSQL database for the app (patientdb).
Start a test database (test_patientdb) for Jest integration tests.
Access the application at http://localhost:3000.

API Endpoints
Here are the key RESTful API endpoints:

Patient Endpoints
POST /patients: Create a new patient.
GET /patients: Retrieve all patients.
GET /patients/:id: Retrieve a specific patient by ID.
PUT /patients/:id: Update a patient's details.
DELETE /patients/:id: Delete a patient.
Medical History
Medical history is managed as part of the patient's data. You can include or update the medicalHistory array when creating or updating a patient.

Folder Structure
PLAINTEXT
healthtrack-api/
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── config/             # Configuration files (e.g., Prisma client)
│   ├── controllers/        # API controllers
│   ├── dtos/               # Data transfer objects (DTOs) for validation
│   ├── interfaces/         # TypeScript interfaces
│   ├── middlewares/        # Express middlewares
│   ├── repositories/       # Database repositories (Prisma queries)
│   ├── services/           # Business logic and service layer
│   ├── tests/              # Jest test files
│   └── index.ts            # Application entry point
├── .env                    # Environment variables
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Dockerfile for the app
├── package.json            # npm scripts and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
Useful Scripts
Here are some useful npm scripts you can run:

npm run dev: Start the development server.
npm run build: Compile the TypeScript code for production.
npm start: Start the production server.
npm test: Run the test suite.
npm run test:watch: Run tests in watch mode.
npm run test:coverage: Generate test coverage report.
npx prisma studio: Open Prisma Studio to visualize the database.
Contributing
We welcome contributions to this project! If you'd like to contribute, follow these steps:

Fork the repository.
Create a new branch for your feature or bugfix:
BASH
git checkout -b feature/my-feature
Commit your changes:
BASH
git commit -m "Add new feature"
Push to your branch:
BASH
git push origin feature/my-feature
Open a Pull Request on the main repository.
License
This project is licensed under the MIT License.

Contact
For any questions or support, please contact:

GitHub: zohaibmir
Email: zohaib.mir@gmail.com