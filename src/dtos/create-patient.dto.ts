import { IsString, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MedicalHistoryDTO {
  @IsString()
  condition!: string;
}

export class CreatePatientDTO {
  @IsString()
  name!: string;

  @IsDateString() // Accepts ISO-8601 date strings
  dateOfBirth!: string;

  @IsString()
  contactInfo!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicalHistoryDTO)
  medicalHistory!: MedicalHistoryDTO[];
}
