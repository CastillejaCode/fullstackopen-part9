/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const router = express.Router();

import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

router.get('/', (_req, res) => {
	res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatientEntry(req.body);
		const addedPatient = patientsService.addPatient(newPatient);
		res.send(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
