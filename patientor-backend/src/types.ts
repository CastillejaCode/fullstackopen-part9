export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown
// 	? Omit<T, K>
// 	: never;
// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type NewPatient = Omit<Patient, 'id'>;

export type SafePatient = Omit<Patient, 'ssn'>;
