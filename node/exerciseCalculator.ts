interface Results {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

export const calculateExercises = (
	array: number[],
	target: number
): Results => {
	const periodLength = array.length;
	const trainingDays = array.filter((day: number) => day !== 0).length;
	const average = array.reduce(
		(prev, current) => prev + current / array.length,
		0
	);
	const rating = (average: number, target: number): number => {
		const difference = target - average;
		if (difference <= 0) return 3;
		if (difference > 0 && difference < 1) return 2;
		else return 1;
	};

	const ratingDescription = (rating: number): string => {
		switch (rating) {
			case 3:
				return 'Good job, you reached the target!';
			case 2:
				return 'Not bad, keep up the work';
			case 1:
				return 'Get it together man, try harder';
			default:
				throw new Error('You messed up, silly!');
		}
	};

	return {
		periodLength,
		trainingDays,
		target,
		average,
		success: average >= target,
		rating: rating(average, target),
		ratingDescription: ratingDescription(rating(average, target)),
	};
};

// const [target, array] = [
// 	Number(process.argv[2]),
// 	process.argv.slice(3).map((day) => Number(day)),
// ];

// try {
// 	if (array.includes(NaN) || typeof target !== 'number') {
// 		throw new Error('You should have put in all numbers!');
// 	}
// 	console.log(calculateExercises(array, target));
// } catch (error: unknown) {
// 	let errorMessage = 'Something went wrong: ';
// 	if (error instanceof Error) {
// 		errorMessage += error.message;
// 	}
// 	console.log(errorMessage);
// }
