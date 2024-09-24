import patientsData from '../data/patients';
import { Patient, PatientWithoutSSN } from '../types/patients.types';

export const getPatients = (): Patient[] => {
    return patientsData;
};

export const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patientsData.map(({ ssn, ...rest }) => rest);
};