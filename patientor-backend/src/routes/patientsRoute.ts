import express from 'express';
const router = express.Router();

import patientsService from '../services/patientsService';

router.get('/', (_req, res) => {
	res.send(patientsService.getPatients());
});

export default router;
