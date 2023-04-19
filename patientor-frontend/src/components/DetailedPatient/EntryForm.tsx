import { useState } from 'react';
import { EntryWithoutId } from '../../types';

interface Props {
	handleSubmit: (entry: EntryWithoutId, id: string) => void;
	id: string;
}

const EntryForm = ({ handleSubmit, id }: Props) => {
	const [formType, setFormType] = useState<string>('HealthCheck');

	const submitEntry = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			description: { value: string };
			date: { value: string };
			specialist: { value: string };
			diagnoses: { value: string };
			dischargeDate: { value: string };
			dischargeCriteria: { value: string };
			rating: { value: string };
			employer: { value: string };
			sickStart: { value: Date };
			sickEnd: { value: Date };
		};
		const description = target.description.value;
		const date = target.date.value;
		const specialist = target.specialist.value;
		const diagnoses = target.diagnoses.value;

		let newEntry = {
			description,
			date,
			specialist,
			diagnoses,
		};

		if (formType === 'Hospital') {
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
		}
		if (formType === 'HealthCheck') {
			handleSubmit(
				{
					...newEntry,
					type: formType,
					healthCheckRating: Number(target.rating.value),
				},
				id
			);
		}
	};

	const HealthCheckForm = () => {
		return (
			<label htmlFor=''>
				HealthCheck Rating
				<input type='number' name='rating' />
			</label>
		);
	};

	const HospitalForm = () => {
		return (
			<>
				<label htmlFor=''>
					Discharge Date
					<input type='date' name='dischargeDate' />
				</label>
				<label htmlFor=''>
					Discharge Criteria
					<input type='text' name='dischargeCriteria' />
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
					<input type='text' name='description' />
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
				<label htmlFor=''>
					Diagnosis Codes
					<input type='text' name='diagnoses' />
				</label>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default EntryForm;
