import patientsData from '../data/patients';
import { NewPatient, Patient, PatientWithoutSSN } from '../types/patients.types';
import { v4 as uuidv4 } from 'uuid';

export const getPatients = (): Patient[] => {
    return patientsData;
};

export const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patientsData.map(({ ssn, ...rest }) => rest);
};

export const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient,
    };
    patientsData.push(newPatient);
    return newPatient;
};
