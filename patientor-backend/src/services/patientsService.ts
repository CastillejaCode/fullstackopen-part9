import patientsData from '../data/patients';
import { SafePatient } from '../types';

const getPatients = (): SafePatient[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export default {
	getPatients,
};
