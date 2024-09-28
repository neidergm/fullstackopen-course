import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import { Patient } from "../../types/patients.types";
import * as diagnosesService from "../../services/diagnoses";
import { Diagnose } from "../../types/diagnoses.types";
import Entry from "./Entry";
import AddEntry from "./AddEntry";

const PatientDetails = () => {

    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

    const getDiagnoses = async () => {
        const diagnoses = await diagnosesService.getAll();
        setDiagnoses(diagnoses);
    };

    const fetchPatient = async () => {
        if (id) {
            const fetchedPatient = await patientsService.getById(id);

            fetchedPatient.entries.forEach(entry => {
                entry.diagnosisCodes = entry.diagnosisCodes?.map(code => {
                    const diagnose = diagnoses.find(diagnose => diagnose.code === code);
                    return diagnose ? `${code} ${diagnose.name}` : code;
                });
            });

            setPatient(fetchedPatient);
        }
    };

    useEffect(() => {
        if (diagnoses.length === 0) {
            getDiagnoses();
        } else {
            fetchPatient();
        }
    }, [diagnoses]);

    if (!patient) {
        return <div>Loading patient details...</div>;
    }

    return (
        <div>
            <h1>
                {patient.name}

                <b> {patient.gender === "male" ? "♂" : patient.gender === "female" ? "♀" : "⚥"}</b>
            </h1>

            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>

            <h2>Entries</h2>

            <div>
                <AddEntry onSuccessCallback={fetchPatient} diagnoses={diagnoses} />
            </div>

            <div>
                {patient.entries.map(entry => (
                    <Entry key={entry.id} entry={entry} />
                ))}
            </div>
        </div>
    );
};

export default PatientDetails;