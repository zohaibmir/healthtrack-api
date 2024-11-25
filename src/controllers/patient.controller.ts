import { Request, Response } from 'express';
import PatientService from '../services/patient.service';
import { CreatePatientDTO } from '../dtos/create-patient.dto';
import { UpdatePatientDTO } from '../dtos/update-patient.dto';

class PatientController {
  async createPatient(req: Request, res: Response) {
    const data: CreatePatientDTO = req.body;
    const patient = await PatientService.createPatient(data);
    return res.status(201).json(patient);
  }

  async getPatients(req: Request, res: Response) {
    const patients = await PatientService.getPatients();
    return res.status(200).json(patients);
  }

  async getPatientById(req: Request, res: Response) {
    const patient = await PatientService.getPatientById(+req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    return res.status(200).json(patient);
  }

  async updatePatient(req: Request, res: Response) {
    const id = +req.params.id;
    const data: UpdatePatientDTO = req.body;
    const updatedPatient = await PatientService.updatePatient(id, data);
    return res.status(200).json(updatedPatient);
  }

  async deletePatient(req: Request, res: Response) {
    await PatientService.deletePatient(+req.params.id);
    return res.status(204).send();
  }
}

export default new PatientController();
