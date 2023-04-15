interface Parts {
	name: string;
	exerciseCount: number;
}

const Total = ({ parts }: { parts: Parts[] }) => {
	return (
		<p>
			Number of exercises{' '}
			{parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</p>
	);
};
export default Total;
