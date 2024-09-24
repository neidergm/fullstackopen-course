import diagnosesData from '../data/diagnoses';
import { Diagnose } from '../types/diagnoses.types';

export const getDiagnoses = (): Diagnose[] => {
    return diagnosesData;
};