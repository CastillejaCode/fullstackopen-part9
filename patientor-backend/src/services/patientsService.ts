import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients';
import { Patient, NewPatient, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const findById = (id: string): Patient | undefined => {
	return patientsData.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
	const NewPatient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuid(),
		...entry,
	};
	patientsData.push(NewPatient);
	return NewPatient;
};

export default {
	getPatients,
	findById,
	addPatient,
};
