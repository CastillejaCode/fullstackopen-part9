import { useEffect, useState } from 'react';
import { EntryWithoutId, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import Entries from './Entries';
import EntryForm from './EntryForm';
import axios from 'axios';

const DetailedPatient = () => {
	const id = useParams().id as string;
	const [patient, setPatient] = useState<Patient>({} as Patient);
	const [notification, setNotification] = useState('');

	useEffect(() => {
		(async () => {
			const newPatient = await patientService.getPatient(id);
			setPatient(newPatient);
		})();
	}, []);

	const handleSubmit = async (entry: EntryWithoutId, id: string) => {
		try {
			const result = await patientService.createEntry(entry, id);
			setPatient({ ...patient, entries: [...patient.entries, result] });
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setNotification(error.response?.data);
			} else {
				setNotification('Unknown Axios Error');
			}
			setInterval(() => setNotification(''), 5000);
		}
	};

	if (!patient.entries) return <div>Still loading</div>;

	return (
		<div>
			<h2>{patient.name}</h2>
			<h4>
				Gender: {patient.gender} {' | '} DOB: {patient.dateOfBirth}
			</h4>

			<p>SSN: {patient.ssn}</p>
			<p>Occupation: {patient.occupation}</p>
			<br />
			{notification && <h2 style={{ color: 'red' }}>{notification}</h2>}
			<EntryForm id={id} handleSubmit={handleSubmit} />
			<h3>Entries</h3>
			<Entries entries={patient.entries} />
		</div>
	);
};

export default DetailedPatient;
