import { Entry as EntryType, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types/patients.types";
import Heart from "@mui/icons-material/Favorite";
import Work from "@mui/icons-material/Work";
import MedicalServices from "@mui/icons-material/MedicalServices";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";

const Entry = ({ entry }: { entry: EntryType }) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        default:
            assertNever(entry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Card sx={{ marginBottom: "10px" }}>
            <CardContent>
                <Typography>{entry.date} <MedicalServices /></Typography>
                <Typography><i>{entry.description}</i></Typography>
                <Typography>Specialist: {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    const getHealthColor = (value: number) => {
        switch (value) {
            case 0:
                return "green";
            case 3:
                return "red";
            default:
                return "yellow";
        }
    };

    return (
        <Card sx={{ marginBottom: "10px" }}>
            <CardContent>
                <Typography>{entry.date} <MedicalServices /></Typography>
                <Typography><i>{entry.description}</i></Typography>
                <Heart sx={{ color: getHealthColor(entry.healthCheckRating) }} />
                <Typography>Specialist: {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Card sx={{ marginBottom: "10px" }}>
            <CardContent>
                <Typography>{entry.date} <Work /> <b>{entry.employerName}</b></Typography>
                <Typography><i>{entry.description}</i></Typography>
                <Typography>Specialist: {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

export default Entry;
