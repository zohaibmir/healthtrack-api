export interface MedicalHistoryInput {
    id?: number; // Optional for updates
    condition: string;
  }
  
  export interface PatientInput {
    name: string;
    dateOfBirth: string; // ISO Date format
    contactInfo: string;
    medicalHistory: MedicalHistoryInput[];
  }
  