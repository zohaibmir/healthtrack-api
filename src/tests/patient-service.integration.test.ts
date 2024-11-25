import PatientService from '../services/patient.service';
import prismaClient from '../config/prisma.client';
import { CreatePatientDTO } from '../dtos/create-patient.dto';
import { UpdatePatientDTO } from '../dtos/update-patient.dto';

describe('PatientService Integration Tests', () => {
  beforeAll(async () => {
    // Reset the database before running tests
    await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE "Patient" CASCADE`);
  });

  afterEach(async () => {
    // Clean up the database after each test
    await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE "Patient" CASCADE`);
  });

  afterAll(async () => {
    // Disconnect Prisma client after all tests
    await prismaClient.$disconnect();
  });

  describe('PatientService Functions', () => {
    it('should create a new patient', async () => {
      const newPatient: CreatePatientDTO = {
        name: 'John Doe',
        dateOfBirth: '1980-01-01',
        contactInfo: '123 Main St',
        medicalHistory: [{ condition: 'Diabetes' }],
      };

      const createdPatient = await PatientService.createPatient(newPatient);

      // Assertions
      expect(createdPatient).toHaveProperty('id');
      expect(createdPatient.name).toBe('John Doe');
      expect(createdPatient.contactInfo).toBe('123 Main St');
    });

    it('should fetch all patients', async () => {
      // Seed some data
      await PatientService.createPatient({
        name: 'Jane Doe',
        dateOfBirth: '1990-01-01',
        contactInfo: '456 Elm St',
        medicalHistory: [],
      });

      const patients = await PatientService.getPatients();

      // Assertions
      expect(patients).toBeInstanceOf(Array);
      expect(patients.length).toBeGreaterThanOrEqual(1);
      expect(patients[0]).toHaveProperty('id');
      expect(patients[0]).toHaveProperty('name');
    });

    it('should fetch a patient by ID', async () => {
      const newPatient: CreatePatientDTO = {
        name: 'Alice Doe',
        dateOfBirth: '1975-08-20',
        contactInfo: '789 Oak St',
        medicalHistory: [],
      };

      const createdPatient = await PatientService.createPatient(newPatient);

      const foundPatient = await PatientService.getPatientById(createdPatient.id);

      // Assertions
      expect(foundPatient).toBeTruthy();
      expect(foundPatient?.id).toBe(createdPatient.id);
      expect(foundPatient?.name).toBe('Alice Doe');
    });

    it('should update a patient', async () => {
      const newPatient: CreatePatientDTO = {
        name: 'Bob Doe',
        dateOfBirth: '1985-03-12',
        contactInfo: '321 Birch St',
        medicalHistory: [],
      };

      const createdPatient = await PatientService.createPatient(newPatient);

      const updatedData: UpdatePatientDTO = {
        name: 'Robert Doe',
        dateOfBirth: '1975-08-20',
        contactInfo: '654 Cedar St',
        medicalHistory: [],
      };

      const updatedPatient = await PatientService.updatePatient(createdPatient.id, updatedData);
      // Assertions
      expect(updatedPatient.name).toBe('Robert Doe');
      expect(updatedPatient.contactInfo).toBe('654 Cedar St');
    });

    it('should delete a patient', async () => {
      const newPatient: CreatePatientDTO = {
        name: 'Charlie Doe',
        dateOfBirth: '1995-06-25',
        contactInfo: '987 Pine St',
        medicalHistory: [],
      };

      const createdPatient = await PatientService.createPatient(newPatient);

      await PatientService.deletePatient(createdPatient.id);

      const foundPatient = await PatientService.getPatientById(createdPatient.id);

      // Assertions
      expect(foundPatient).toBeNull();
    });
  });
});
