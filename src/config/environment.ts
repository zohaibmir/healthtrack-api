import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
};
