import prismaClient from '../config/prisma.client';
import { Patient } from '@prisma/client';
import { IRepository } from '../interfaces/repository.interface';
import { PatientInput } from '../interfaces/patient.interface';

class PatientRepository implements IRepository<PatientInput, Patient> {
  async create(data: PatientInput): Promise<Patient> {
    return prismaClient.patient.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        medicalHistory: { create: data.medicalHistory },
      },
      include: { medicalHistory: true },
    });
  }

  async findAll(): Promise<Patient[]> {
    return prismaClient.patient.findMany({ include: { medicalHistory: true } });
  }

  async findById(id: number): Promise<Patient | null> {
    return prismaClient.patient.findUnique({
      where: { id },
      include: { medicalHistory: true },
    });
  }

  async update(id: number, data: PatientInput): Promise<Patient> {
    return prismaClient.patient.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth), // Convert to Date object
        medicalHistory: {
          upsert: data.medicalHistory.map((mh) => ({
            where: { id: mh.id || 0 },
            update: mh,
            create: mh,
          })),
        },
      },
      include: { medicalHistory: true },
    });
  }

  async delete(id: number): Promise<void> {
    await prismaClient.patient.delete({ where: { id } });
  }
}

export default new PatientRepository();
