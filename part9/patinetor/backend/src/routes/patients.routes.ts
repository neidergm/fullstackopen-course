import express from 'express';
import { getPatientsWithoutSSN } from '../service/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatientsWithoutSSN());
});

const patientsRouter = router;

export default patientsRouter;
