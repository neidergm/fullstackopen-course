import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import { Patient } from "../../types";

const PatientDetails = () => {

    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const fetchedPatient = await patientsService.getById(id);
                setPatient(fetchedPatient);
            }
        };
        fetchPatient();
    }, [id]);

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
        </div>
    );
};

export default PatientDetails;