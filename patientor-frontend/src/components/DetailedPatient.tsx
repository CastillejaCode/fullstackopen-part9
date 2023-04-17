import { useEffect, useState } from 'react';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';

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

	return (
		<div>
			<h2>{patient.name}</h2>
			<h4>
				Gender: {patient.gender} {' | '} DOB: {patient.dateOfBirth}
			</h4>

			<p>SSN: {patient.ssn}</p>
			<p>Occupation: {patient.occupation}</p>
		</div>
	);
};

export default DetailedPatient;
