import { Router } from 'express';
import PatientController from '../../controllers/patient.controller';
import { validateDTO } from '../../middlewares/validation.middleware';
import { CreatePatientDTO } from '../../dtos/create-patient.dto';
import { UpdatePatientDTO } from '../../dtos/update-patient.dto';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();

router.post(
  '/',
  validateDTO(CreatePatientDTO),
  asyncHandler(PatientController.createPatient)
);

router.get('/', asyncHandler(PatientController.getPatients));

router.get('/:id', asyncHandler(PatientController.getPatientById));

router.put(
  '/:id',
  validateDTO(UpdatePatientDTO),
  asyncHandler(PatientController.updatePatient)
);

router.delete('/:id', asyncHandler(PatientController.deletePatient));

export default router;
