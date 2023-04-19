import { NewPatient, Gender, EntryWithoutId, BaseEntry } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect string format');
	}

	return name;
};

const parseNumber = (number: unknown): number => {
	if (typeof number !== 'number') {
		throw new Error('Incorrect number format');
	}
	return number;
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

export const toNewPatientEntry = (entry: unknown): NewPatient => {
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
			entries: [],
		};

		return newEntry;
	}

	throw new Error('Some fields are missin, oopsie!');
};

export const toNewEntry = (entry: unknown): EntryWithoutId => {
	if (!entry || typeof entry !== 'object') {
		throw new Error('Missing data');
	}

	if (
		'date' in entry &&
		'description' in entry &&
		'specialist' in entry &&
		'type' in entry
	) {
		const newEntry: Omit<BaseEntry, 'id'> = {
			date: parseDate(entry.date),
			description: parseString(entry.description),
			specialist: parseString(entry.specialist),
		};

		if (entry.type === 'HealthCheck' && 'healthCheckRating' in entry)
			return {
				...newEntry,
				healthCheckRating: parseNumber(entry.healthCheckRating),
				type: entry.type,
			};

		if (entry.type === 'Hospital' && 'discharge' in entry) {
			if (!entry.discharge || typeof entry.discharge !== 'object') {
				throw new Error('Missing data');
			}

			if ('date' in entry.discharge && 'criteria' in entry.discharge) {
				return {
					...newEntry,
					type: entry.type,
					discharge: {
						date: parseString(entry.discharge.date),
						criteria: parseString(entry.discharge.criteria),
					},
				};
			}
		}

		if (entry.type === 'OccupationalHealthcare' && 'employerName' in entry) {
			return {
				...newEntry,
				type: entry.type,
				employerName: parseString(entry.employerName),
			};
		}
	}

	throw new Error('You missed some fields there, pal');
};
