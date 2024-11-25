import { Router } from 'express';
import PatientController from '../../controllers/patient.controller';
import { validateDTO } from '../../middlewares/validation.middleware';
import { CreatePatientDTO } from '../../dtos/create-patient.dto';
import { UpdatePatientDTO } from '../../dtos/update-patient.dto';
import { asyncHandler } from '../../utils/async-handler';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorizeRoles } from '../../middlewares/role.middleware';

const router = Router();

// Routes
router.post(
  '/',
  authenticate, // Require authentication
  authorizeRoles('admin', 'doctor'), // Only admins or doctors can create patients
  validateDTO(CreatePatientDTO),
  asyncHandler(PatientController.createPatient)
);

router.get(
  '/',
  authenticate, // Require authentication
  authorizeRoles('admin', 'doctor'), // Only admins or doctors can view all patients
  asyncHandler(PatientController.getPatients)
);

router.get(
  '/:id',
  authenticate, // Require authentication
  asyncHandler(PatientController.getPatientById)
);

router.put(
  '/:id',
  authenticate, // Require authentication
  authorizeRoles('admin', 'doctor'), // Only admins or doctors can update patients
  validateDTO(UpdatePatientDTO),
  asyncHandler(PatientController.updatePatient)
);

router.delete(
  '/:id',
  authenticate, // Require authentication
  authorizeRoles('admin'), // Only admins can delete patients
  asyncHandler(PatientController.deletePatient)
);

export default router;
