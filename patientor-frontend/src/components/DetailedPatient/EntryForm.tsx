import { useEffect, useState } from 'react';
import { Diagnosis, EntryWithoutId } from '../../types';
import { getAllDiagnoses } from '../../services/diagnoses';
import MultipleSelect from './MultipleSelect';

interface Props {
	handleSubmit: (entry: EntryWithoutId, id: string) => void;
	id: string;
}

const EntryForm = ({ handleSubmit, id }: Props) => {
	const [formType, setFormType] = useState<string>('HealthCheck');
	const [allCodes, setAllCodes] = useState<Diagnosis['code'][]>([]);
	const [codes, setCodes] = useState<Diagnosis['code'][]>([]);

	useEffect(() => {
		const fetchCodes = async () => {
			const codes = await getAllDiagnoses();
			const newCodes = codes.map((diagnosis: Diagnosis) => diagnosis.code);
			setAllCodes(newCodes);
		};

		fetchCodes();
	}, []);

	const submitEntry = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			description: { value: string };
			date: { value: string };
			specialist: { value: string };
			dischargeDate: { value: string };
			dischargeCriteria: { value: string };
			rating: { value: string };
			employer: { value: string };
			sickStart: { value: string };
			sickEnd: { value: string };
		};
		const description = target.description.value;
		const date = target.date.value;
		const specialist = target.specialist.value;

		const newEntry = {
			description,
			date,
			specialist,
			diagnosisCodes: codes,
		};

		switch (formType) {
			case 'HealthCheck':
				handleSubmit(
					{
						...newEntry,
						type: formType,
						healthCheckRating: Number(target.rating.value),
					},
					id
				);
				break;
			case 'Hospital':
				handleSubmit(
					{
						...newEntry,
						type: formType,
						discharge: {
							date: target.dischargeDate.value,
							criteria: target.dischargeCriteria.value,
						},
					},
					id
				);
				break;
			case 'OccupationalHealthcare':
				handleSubmit(
					{
						...newEntry,
						type: formType,
						employerName: target.employer.value,
						sickLeave: {
							startDate: target.sickStart.value,
							endDate: target.sickEnd.value,
						},
					},
					id
				);
				break;
			default:
				throw new Error('Some input did not work out!');
		}

		target.date.value = '';
		target.description.value = '';
		target.specialist.value = '';
		target.dischargeDate.value = '';
		target.dischargeCriteria.value = '';
	};

	const HealthCheckForm = () => {
		return (
			<label htmlFor=''>
				HealthCheck Rating
				<input type='number' name='rating' defaultValue={0} min={0} max={3} />
			</label>
		);
	};

	const HospitalForm = () => {
		return (
			<>
				<label htmlFor=''>
					Discharge Date
					<input type='date' name='dischargeDate' required />
				</label>
				<label htmlFor=''>
					Discharge Criteria
					<input type='text' name='dischargeCriteria' required />
				</label>
			</>
		);
	};

	const OccupationalForm = () => {
		return (
			<>
				<label htmlFor=''>
					Employer
					<input type='text' name='employer' required />
				</label>
				<label htmlFor=''>
					Sick Leave Start Date
					<input type='date' name='sickStart' />
				</label>
				<label htmlFor=''>
					Sick Leave End Date
					<input type='date' name='sickEnd' />
				</label>
			</>
		);
	};

	return (
		<div>
			<select
				name='form'
				id='form'
				onChange={(event) => setFormType(event.target.value)}>
				<option value='HealthCheck'>HealthCheck</option>
				<option value='Hospital'>Hospital</option>
				<option value='OccupationalHealthcare'>Occupational</option>
			</select>
			<form
				onSubmit={submitEntry}
				style={{ display: 'flex', flexDirection: 'column' }}>
				<label htmlFor=''>
					Description
					<input type='text' name='description' required />
				</label>
				<label htmlFor=''>
					Date
					<input type='date' name='date' required />
				</label>
				<label htmlFor=''>
					Specialist
					<input type='text' name='specialist' required />
				</label>
				{formType === 'HealthCheck' && HealthCheckForm()}
				{formType === 'Hospital' && HospitalForm()}
				{formType === 'OccupationalHealthcare' && OccupationalForm()}
				{/* <label htmlFor=''>
					Diagnosis Codes
					<input type='text' name='diagnoses' />
				</label> */}
				<MultipleSelect allCodes={allCodes} setCodes={setCodes} codes={codes} />
				<button type='submit' style={{ width: 'fit-content' }}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default EntryForm;
