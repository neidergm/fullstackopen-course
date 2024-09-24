import express from 'express';
import { getDiagnoses } from '../service/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses = getDiagnoses();
    res.send(diagnoses);
});

const diagnosesRouter = router;

export default diagnosesRouter;
