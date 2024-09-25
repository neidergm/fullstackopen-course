import { Gender, NewPatient } from "../types/patients.types";

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

