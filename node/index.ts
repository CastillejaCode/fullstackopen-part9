import express from 'express';

const app = express();
app.use(express.json());

import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const { height, weight } = req.query;
		if (
			typeof Number(height) !== 'number' ||
			typeof Number(weight) !== 'number'
		) {
			throw new Error('parameter formatting incorrect');
		}
		if (!height || !weight) {
			throw new Error('parameter formatting incorrect');
		}
		const bmi = calculateBMI(Number(height), Number(weight));
		const objectBmi = {
			height,
			weight,
			bmi,
		};
		res.send(objectBmi);
	} catch (error: unknown) {
		let errorMessage = 'YOU BROKE SOMETHING: ';
		if (error instanceof Error) {
			errorMessage += error.message;
		}
		res.send(errorMessage);
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).send({ error: 'parameters missing' });
	}

	if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
		return res.status(400).send({ error: 'parameters malformatted' });
	}

	if (!daily_exercises.every((day: string) => typeof day === 'number')) {
		return res.status(400).send({ error: 'parameters malformatted' });
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const exercises: number[] = daily_exercises.map((day: string) => Number(day));

	const result = calculateExercises(exercises, Number(target));
	return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`You are now connected to ${PORT}`);
});
