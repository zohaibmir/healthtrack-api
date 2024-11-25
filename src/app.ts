import 'reflect-metadata'; // Import reflect-metadata first
import express from 'express';
import authRoutes from './api/routes/auth.routes';
import patientRoutes from './api/routes/patient.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
//Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/patients', patientRoutes);

// Global error handler
app.use(errorHandler);

export default app;
