import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types/diagnoses.types";

const getAll = async () => {
    const response = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
    return response.data;
};

export {
    getAll
};
