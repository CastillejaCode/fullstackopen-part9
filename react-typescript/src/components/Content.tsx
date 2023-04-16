import Part from './Part';
import { CoursePart } from '../App';


const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<div>
			{parts.map((part) => {
				return (
					<p key={part.name}>
						{part.name} {part.exerciseCount}
						<Part part={part} />
					</p>
				);
			})}
		</div>
	);
};

export default Content;
