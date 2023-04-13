import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnosesRoute';
import patientsRouter from './routes/patientsRoute';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Connected to PORT ${PORT}`);
});
