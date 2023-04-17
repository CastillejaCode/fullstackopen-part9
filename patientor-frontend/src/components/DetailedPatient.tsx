import { useEffect, useState } from 'react';
import { Patient, Entry, Diagnosis } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { getAllDiagnoses } from '../services/diagnoses';

const Entries = ({ entries }: { entries: Entry[] }) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const result = await getAllDiagnoses();
			setDiagnoses(result);
		};

		fetchDiagnoses();
	}, []);

	if (!diagnoses) return <div>Still loading</div>;

	console.log(diagnoses);
	return (
		<div>
			{entries.map((entry) => {
				return (
					<div key={entry.id}>
						{entry.date}, <em>{entry.description}</em>
						<ul>
							{entry.diagnosisCodes?.map((code) => {
								const diagnosisName = diagnoses.find(
									(diagnosis) => diagnosis.code === code
								)?.name;
								return (
									<li key={code}>
										{code} {diagnosisName}
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
};

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
