import { MedicalHistoryDTO } from './create-patient.dto';
import { IsString, IsDateString, IsArray, ValidateNested, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePatientDTO {
  @IsOptional() // Field is optional
  @IsString()
  @MinLength(1) // Ensures name is a non-empty string if provided
  name?: string;

  @IsOptional() // Field is optional
  @IsDateString() // Accepts ISO-8601 date strings
  dateOfBirth!: string;

  @IsOptional() // Field is optional
  @IsString()
  @MinLength(1) // Ensures contactInfo is a non-empty string if provided
  contactInfo?: string;

  @IsOptional() // Field is optional
  @IsArray() // Ensures medicalHistory is an array if provided
  @ValidateNested({ each: true }) // Ensures each element in medicalHistory is validated
  @Type(() => MedicalHistoryDTO)
  medicalHistory?: MedicalHistoryDTO[];
}
