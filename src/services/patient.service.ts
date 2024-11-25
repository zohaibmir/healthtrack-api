import { CreatePatientDTO } from '../dtos/create-patient.dto';
import { UpdatePatientDTO } from '../dtos/update-patient.dto';
import { IRepository } from '../interfaces/repository.interface';
import { Patient } from '@prisma/client';
import PatientRepository from '../repositories/patient.repository';

class PatientService {
  private patientRepository: IRepository<CreatePatientDTO | UpdatePatientDTO, Patient>;

  constructor(repository: IRepository<CreatePatientDTO | UpdatePatientDTO, Patient>) {
    this.patientRepository = repository;
  }

  async createPatient(data: CreatePatientDTO): Promise<Patient> {
    return this.patientRepository.create(data);
  }

  async getPatients(): Promise<Patient[]> {
    return this.patientRepository.findAll();
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return this.patientRepository.findById(id);
  }

  async updatePatient(id: number, data: UpdatePatientDTO): Promise<Patient> {
    return this.patientRepository.update(id, data);
  }

  async deletePatient(id: number): Promise<void> {
    return this.patientRepository.delete(id);
  }
}

export default new PatientService(PatientRepository);
