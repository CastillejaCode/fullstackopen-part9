import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients';
import {
	Patient,
	NewPatient,
	NonSensitivePatient,
	EntryWithoutId,
	Entry,
} from '../types';

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

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
	const newEntry = {
		id: uuid(),
		...entry,
	};
	patientsData.find((patient) => patient.id === id)?.entries.push(newEntry);
	return newEntry;
};

export default {
	getPatients,
	findById,
	addPatient,
	addEntry,
};
