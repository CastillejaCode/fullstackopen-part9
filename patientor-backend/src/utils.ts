import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect name format');
	}

	return name;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect date format');
	}

	return date;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((g) => g.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect gender options chosen');
	}

	return gender;
};

const toNewPatientEntry = (entry: unknown): NewPatient => {
	if (!entry || typeof entry !== 'object') {
		throw new Error('Missing data');
	}
	if (
		'name' in entry &&
		'dateOfBirth' in entry &&
		'ssn' in entry &&
		'occupation' in entry &&
		'gender' in entry
	) {
		const newEntry: NewPatient = {
			name: parseString(entry.name),
			dateOfBirth: parseDate(entry.dateOfBirth),
			ssn: parseString(entry.ssn),
			occupation: parseString(entry.occupation),
			gender: parseGender(entry.gender),
		};

		return newEntry;
	}

	throw new Error('Some fields are missin, oopsie!');
};

export default toNewPatientEntry;
