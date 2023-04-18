import {
	HealthCheckEntry,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from '../../types';
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Hospital = ({ entry }: { entry: HospitalEntry }) => {
	return (
		<div>
			{entry.date}
			<MonitorHeartTwoToneIcon />
			<br />
			<em>{entry.description}</em>
			<br />
			<br />
			<div>
				Discharge: {entry.discharge.date}
				<br />
				Criteria: {entry.discharge.criteria}
			</div>
		</div>
	);
};

export const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
	const healthIcon = () => {
		switch (entry.healthCheckRating) {
			case 0:
				return <FavoriteIcon htmlColor='green' />;
			case 1:
				return <FavoriteIcon htmlColor='yellow' />;
			case 2:
				return <FavoriteIcon htmlColor='orange' />;
			case 3:
				return <FavoriteIcon htmlColor='red' />;
			default:
				return <div></div>;
		}
	};
	return (
		<div>
			{entry.date}
			<LocalHospitalTwoToneIcon />
			<br />
			<em>{entry.description}</em>
			<br />
			Health Rating: {healthIcon()}
		</div>
	);
};

export const OccupationalHealthcare = ({
	entry,
}: {
	entry: OccupationalHealthcareEntry;
}) => {
	return (
		<div>
			{entry.date} <WorkTwoToneIcon /> {entry.employerName}
			<br />
			<em>{entry.description}</em>
			<br />
			<br />
			{entry.sickLeave && (
				<div>
					<strong>Sick Leave</strong>
					<br />
					Start: {entry.sickLeave.startDate}
					<br />
					End: {entry.sickLeave.endDate}
				</div>
			)}
		</div>
	);
};
