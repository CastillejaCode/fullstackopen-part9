import { useEffect, useState } from 'react';
import { Entry, Diagnosis } from '../../types';
import { getAllDiagnoses } from '../../services/diagnoses';
import { HealthCheck, Hospital, OccupationalHealthcare } from './EntryTypes';

const EntryDetails = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case 'Hospital':
			return <Hospital entry={entry} />;
		case 'HealthCheck':
			return <HealthCheck entry={entry} />;
		case 'OccupationalHealthcare':
			return <OccupationalHealthcare entry={entry} />;
		default:
			const something: never = entry;
			return something;
	}
};

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

	return (
		<div>
			{entries.map((entry) => (
				<div key={entry.id} style={{ border: 'solid black', margin: '1rem' }}>
					<EntryDetails entry={entry} />
					{entry.diagnosisCodes && (
						<ul>
							<h3>Diagnoses</h3>
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
					)}
					diagnosed by {entry.specialist}
				</div>
			))}
		</div>
	);
};

export default Entries;
