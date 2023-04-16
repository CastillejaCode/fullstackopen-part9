import { CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case 'basic':
			return (
				<div>
					<em>{part.description}</em>
				</div>
			);
		case 'group':
			return <div> project exercises: {part.groupProjectCount}</div>;
		case 'background':
			return (
				<div>
					<em>{part.description}</em>
					<br />
					Background: {part.backgroundMaterial}
				</div>
			);
		case 'special':
			return (
				<div>
					<em>{part.description}</em>
					<br />
					Required skills: {part.requirements.join(', ')}
				</div>
			);
		default: {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const _exhaustiveCheck: never = part;
			throw new Error('Discriminated union member not added!');
		}
	}
};

export default Part;
