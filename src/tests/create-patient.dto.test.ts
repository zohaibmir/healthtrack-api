import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreatePatientDTO } from '../dtos/create-patient.dto';

describe('CreatePatientDTO Validation', () => {
  it('should return validation errors for invalid data', async () => {
    const dto = new CreatePatientDTO();
    dto.name = null as any; // Invalid: null
    dto.dateOfBirth = 'not-a-date'; // Invalid: not a valid date
    dto.contactInfo = 123 as any; // Invalid: number instead of string
    dto.medicalHistory = [{ condition: null as any }]; // Invalid: null

    const errors = await validate(dto);

    // Assertions
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate correctly for valid data', async () => {
    const dto = new CreatePatientDTO();
    dto.name = 'John Doe';
    dto.dateOfBirth = '1980-01-01';
    dto.contactInfo = '123 Main St';
    dto.medicalHistory = [{ condition: 'Diabetes' }];

    const errors = await validate(dto);

    // Assertions
    expect(errors).toHaveLength(0); // No validation errors
  });
});
