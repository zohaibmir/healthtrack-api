import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

module.exports = async () => {
  console.log("Starting Jest global teardown...");

  // Use TEST_DATABASE_URL to connect
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

  // Connect to the test database
  await prisma.$connect();

  // Reset the test database schema
  try {
    console.log("Cleaning up the test database...");
    await prisma.$queryRawUnsafe(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
    console.log("Test database cleaned up successfully.");
  } catch (error) {
    console.error("Error cleaning up test database:", error);
    throw error;
  }

  // Disconnect from the database
  await prisma.$disconnect();
  console.log("Jest global teardown completed.");
};
