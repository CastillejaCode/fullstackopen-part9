const calculateBMI = (height: number, weight: number): string => {
	//prettier-ignore
	const BMI = Math.round((weight / ((height / 100) ** 2)));
	if (BMI < 18.5) return `Underweight (${BMI}: unhealthy weight)`;
	if (BMI >= 18.5 && BMI < 25) return `Normal (${BMI}: healthy weight)`;
	if (BMI >= 25 && BMI < 30) return `Overweight (${BMI}: unhealthy weight)`;
	else return `Obese (${BMI}: unhealthy weight)`;
};

console.log(calculateBMI(186, 87));
