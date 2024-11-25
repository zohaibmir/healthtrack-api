import 'reflect-metadata'; // Import reflect-metadata first
import express from 'express';
import patientRoutes from './api/routes/patient.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error] ${message}`);
    console.error(err.stack); // Log the stack trace
  
    res.status(status).json({ error: message });
  });
  
app.use('/api/patients', patientRoutes);

// Global error handler
app.use(errorHandler);

export default app;
