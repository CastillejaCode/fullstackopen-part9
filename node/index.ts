import express from 'express';
const app = express();

import { calculateBMI } from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`You are now connected to ${PORT}`);
});
