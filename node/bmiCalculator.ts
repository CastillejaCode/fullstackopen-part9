const calculateBMI = (height: number, weight: number): string => {
	//prettier-ignore
	const BMI = Math.round((weight / ((height / 100) ** 2)));
	if (BMI < 18.5) `Underweight (${BMI}: unhealthy weight)`;
	if (BMI >= 18.5 && BMI < 25) return `Normal (${BMI}: healthy weight)`;
	if (BMI >= 25 && BMI < 30) return `Overweight (${BMI}: unhealthy weight)`;
	if (BMI >= 30) return `Obese (${BMI}: unhealthy weight)`;
	throw new Error('Did you put in correct parameters?');
};

try {
	console.log(
		calculateBMI(parseInt(process.argv[2]), parseInt(process.argv[3]))
	);
} catch (error: unknown) {
	let errorMessage = 'Something went wrong: ';
	if (error instanceof Error) {
		errorMessage += error.message;
	}
	console.log(errorMessage);
}
