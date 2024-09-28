import { BaseEntry, Gender, HealthCheckRating, HospitalEntry, NewEntry, NewPatient, OccupationalHealthcareEntry } from "../types/patients.types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseString = (text: unknown, name?: string): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing text' + (name ? `: "${name}"` : ""));
    }
    return text;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data');

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name, "name"),
            dateOfBirth: parseString(object.dateOfBirth, "dateOfBirth"),
            ssn: parseString(object.ssn, "ssn"),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, "occupation"),
        };
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    console.log(Object.values(HealthCheckRating))
    if (typeof rating !== 'number' || !Object.values(HealthCheckRating).includes(rating)) {
        throw new Error('Incorrect or missing HealthCheckRating');
    }
    return rating as HealthCheckRating;
};

export const toNewPatientEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data');

    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        const baseEntry: Omit<BaseEntry, 'id'> = {
            description: parseString(object.description, "description"),
            date: parseString(object.date, "date"),
            specialist: parseString(object.specialist, "specialist"),
        };

        if ('diagnosisCodes' in object) {
            baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }

        if (object.type === "HealthCheck") {
            if (!('healthCheckRating' in object)) throw new Error('Incorrect data: healthCheckRating field is missing');
            return {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
        } else if (object.type === "Hospital") {
            if (!('discharge' in object)) throw new Error('Incorrect data: discharge field is missing');
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: parseDischarge(object.discharge),
            };
        } else if (object.type === "OccupationalHealthcare") {
            if (!('employerName' in object)) throw new Error('Incorrect data: employerName field is missing');
            if (!('sickLeave' in object)) throw new Error('Incorrect data: sickLeave field is missing');
            return {
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName, "employerName"),
                sickLeave: parseSickLeave(object.sickLeave),
            };
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<string> => {
    if (!object || !Array.isArray(object)) throw new Error('Incorrect data: diagnosisCodes field is invalid');

    return object as Array<string>;
};

const parseDischarge = (object: unknown): HospitalEntry['discharge'] => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object))
        throw new Error('Incorrect data: discharge field is invalid');

    return object as HospitalEntry['discharge'];
};
const parseSickLeave = (object: unknown): OccupationalHealthcareEntry['sickLeave'] => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object))
        throw new Error('Incorrect data: sickLeave field is invalid');

    return object as OccupationalHealthcareEntry['sickLeave'];
};