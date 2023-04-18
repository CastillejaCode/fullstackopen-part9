import { useEffect, useState } from 'react';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import Entries from './Entries';

const DetailedPatient = () => {
	const id = useParams().id;
	const [patient, setPatient] = useState<Patient>({} as Patient);

	useEffect(() => {
		const fetchPatient = async () => {
			if (!id) return;
			const patient = await patientService.getPatient(id);
			setPatient(patient);
		};

		fetchPatient();
	}, [id]);

	if (!patient.entries) return <div>Still loading</div>;

	console.log(patient);

	return (
		<div>
			<h2>{patient.name}</h2>
			<h4>
				Gender: {patient.gender} {' | '} DOB: {patient.dateOfBirth}
			</h4>

			<p>SSN: {patient.ssn}</p>
			<p>Occupation: {patient.occupation}</p>
			<br />
			<h3>Entries</h3>
			<Entries entries={patient.entries} />
		</div>
	);
};

export default DetailedPatient;
