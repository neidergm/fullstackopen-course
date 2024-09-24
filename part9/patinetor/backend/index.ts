import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnoses.routes';
import patientsRouter from './src/routes/patients.routes';

const app = express();

app.use(cors());

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


