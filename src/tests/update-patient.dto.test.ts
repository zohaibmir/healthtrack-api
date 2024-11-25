import 'reflect-metadata';
import { validate } from 'class-validator';
import { UpdatePatientDTO } from '../dtos/update-patient.dto';

describe('UpdatePatientDTO Validation', () => {

    it('should return validation errors for invalid data', async () => {
        const dto = new UpdatePatientDTO();
        dto.name = ''; // Invalid: empty string (fails @IsString())
        dto.dateOfBirth = 'not-a-date'; // Invalid: not a valid ISO-8601 date (fails @IsDateString())
        dto.contactInfo = ''; // Invalid: empty string (fails @IsString())
        dto.medicalHistory = [{ condition: '' }]; // Invalid: empty string (fails @IsString())

        const errors = await validate(dto);

        // Assertions
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.map(e => e.constraints)).toMatchObject([
            { minLength: 'name must be longer than or equal to 1 characters' },
            { isDateString: 'dateOfBirth must be a valid ISO 8601 date string' },
            { minLength: 'contactInfo must be longer than or equal to 1 characters' },
          ]);
    });

    it('should validate correctly for valid data', async () => {
        const dto = new UpdatePatientDTO();
        dto.name = 'Jane Doe';
        dto.dateOfBirth = '1990-01-01';
        dto.contactInfo = '456 Elm St';
        dto.medicalHistory = [{ condition: 'Asthma' }];

        const errors = await validate(dto);

        // Assertions
        expect(errors).toHaveLength(0); // No validation errors
    });
});
