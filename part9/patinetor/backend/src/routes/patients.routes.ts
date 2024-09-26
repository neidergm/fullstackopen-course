import express from 'express';
import { addPatient, getPatientsWithoutSSN, getPatientById } from '../service/patients';
import { toNewPatient } from '../utils/patient.utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatientsWithoutSSN());
});

router.get('/:id', (req, res) => {
    const patient = getPatientById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.status(404).send('Patient not found');
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

const patientsRouter = router;

export default patientsRouter;
