import express from 'express';
import { addPatient, getPatientsWithoutSSN, getPatientById } from '../service/patients';
import { toNewPatient, toNewPatientEntry } from '../utils/patient.utils';
import { v4 as uuidv4 } from 'uuid';

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

router.post('/:id/entries', (req, res) => {
    const patient = getPatientById(req.params.id);
    try {
        if (patient) {
            const newEntry = {
                ...toNewPatientEntry(req.body),
                id: uuidv4(),
            };

            patient.entries.push(newEntry);

            res.status(200).send(newEntry);
        } else {
            res.status(404).send('Patient not found');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
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
