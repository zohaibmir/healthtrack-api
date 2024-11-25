import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

module.exports = async () => {
  console.log("Starting Jest global setup...");

  // Ensure the TEST_DATABASE_URL is being used
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

  // Connect to the test database
  await prisma.$connect();

  // Reset the database schema
  try {
    console.log("Resetting database schema...");
    // Execute each command separately
    await prisma.$queryRawUnsafe(`DROP SCHEMA public CASCADE;`);
    await prisma.$queryRawUnsafe(`CREATE SCHEMA public;`);
    await prisma.$queryRawUnsafe(`GRANT ALL ON SCHEMA public TO postgres;`);
    await prisma.$queryRawUnsafe(`GRANT ALL ON SCHEMA public TO public;`);
    console.log("Database schema reset successfully.");
  } catch (error) {
    console.error("Error resetting database schema:", error);
    throw error;
  }

  // Apply migrations to the test database
  try {
    console.log("Applying migrations...");
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log("Migrations applied successfully.");
  } catch (migrationError) {
    console.error("Error applying migrations:", migrationError);
    throw migrationError;
  }

  // Disconnect from the database
  await prisma.$disconnect();
  console.log("Jest global setup completed.");
};
