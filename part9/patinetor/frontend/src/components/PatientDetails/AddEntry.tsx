import { useState } from "react";
import { Button, TextField, Grid, Box, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import patientsService from "../../services/patients";
import { useParams } from "react-router-dom";
import { NewEntry } from "../../types/patients.types";
import { Diagnose } from "../../types/diagnoses.types";

const initialFormData: NewEntry = {
    description: '',
    date: '',
    specialist: '',
    type: 'HealthCheck',
    healthCheckRating: 0,
    diagnosisCodes: [],
};

const AddEntry = ({ onSuccessCallback, diagnoses }: { onSuccessCallback: () => void, diagnoses: Diagnose[] }) => {
    const { id } = useParams();
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<NewEntry & { [key: string]: unknown }>(initialFormData);

    const [showForm, setShowForm] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: unknown = event.target.value;
        if (event.target.type === 'number') value = Number(value);
        setFormData({ ...formData, [event.target.name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        const {
            dischargeCriteria,
            sickLeaveStartDate,
            sickLeaveEndDate,
            dischargeDate,
            ...restValues
        } = formData;

        const data = restValues as NewEntry;

        if (data.type === 'Hospital') {
            data.discharge = {
                date: dischargeDate as string,
                criteria: dischargeCriteria as string
            };
        } else if (data.type === 'OccupationalHealthcare') {
            data.sickLeave = {
                startDate: sickLeaveStartDate as string,
                endDate: sickLeaveEndDate as string
            };
        }

        patientsService.addEntry(id!, data as never).then(() => {
            toggleForm();
            onSuccessCallback();
            setFormData(initialFormData);
        }).catch(e => {
            setError(e.message);
        });
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const toggleForm = () => {
        setShowForm(s => !s);
    };

    if (!showForm) {
        return <Button variant="contained" color="primary" onClick={toggleForm}>Add New Entry</Button>;
    }

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ mt: 4, p: 2, border: '1px dashed grey' }}>
                <Typography variant="h6" gutterBottom>
                    New {formData.type} entry
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    label="Type"
                                    onChange={e => handleChange(e as never)}
                                >
                                    <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                                    <MenuItem value="Hospital">Hospital</MenuItem>
                                    <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Specialist"
                                name="specialist"
                                value={formData.specialist}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </Grid>
                        {formData.type === 'HealthCheck' && <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Healthcheck rating"
                                name="healthCheckRating"
                                value={formData.healthCheckRating}
                                onChange={handleChange}
                                variant="standard"
                                inputMode="numeric"
                                inputProps={{ min: 0, max: 3, }}
                            />
                        </Grid>}
                        {formData.type === 'Hospital' &&
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            type="date"
                                            fullWidth
                                            label="Discharge date"
                                            name="dischargeDate"
                                            value={formData.dischargeDate}
                                            onChange={handleChange}
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Discharge criteria"
                                            name="dischargeCriteria"
                                            value={formData.dischargeCriteria}
                                            onChange={handleChange}
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        {formData.type === 'OccupationalHealthcare' && <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Employer name"
                                    name="employerName"
                                    value={formData.employerName}
                                    onChange={handleChange}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Sick leave start date"
                                            name="sickLeaveStartDate"
                                            value={formData.sickLeaveStartDate}
                                            onChange={handleChange}
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            type="date"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Sick leave end date"
                                            name="sickLeaveEndDate"
                                            value={formData.sickLeaveEndDate}
                                            onChange={handleChange}
                                            variant="standard"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="diagnosisCodes-label">Diagnosis codes</InputLabel>
                                <Select
                                    labelId="diagnosisCodes-label"
                                    id="diagnosisCodes"
                                    name="diagnosisCodes"
                                    value={formData.diagnosisCodes}
                                    onChange={e => handleChange(e as never)}
                                    multiple
                                    renderValue={selected => selected.map(value => diagnoses.find(d => d.code === value)?.code).join(', ')}
                                >
                                    {
                                        diagnoses.map(diagnosis => (
                                            <MenuItem value={diagnosis.code} key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} container justifyContent="space-between">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
};

export default AddEntry;
