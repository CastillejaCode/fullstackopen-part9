interface Parts {
	name: string;
	exerciseCount: number;
}
const Content = ({ parts }: { parts: Parts[] }) => {
	return (
		<div>
			{parts.map((part) => {
				return (
					<p key={part.name}>
						{part.name} {part.exerciseCount}
					</p>
				);
			})}
		</div>
	);
};

export default Content;
