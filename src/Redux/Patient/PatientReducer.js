import { GET_PATIENTS_DATA, GET_PATIENTS_FAIL, SEARCH_PATIENT, SEARCH_PATIENT_FAIL, ADD_PATIENT, ADD_PATIENT_FAIL, EDIT_PATIENT_FAIL, EDIT_PATIENT } from './PatientAction';

const initialState = {
    getPatients: [],
    addPatient: {},
    searchPatient: {},
    editPatient: {},
}

export const getPatientsReducer = (state = initialState.getPatients, action) => {
    switch (action.type) {
        case GET_PATIENTS_DATA:
            return { getPatients: action.patients }
        case GET_PATIENTS_FAIL:
            return { error: action.patients }
        default: return state;
    }

};

export const addPatientReducer = (state = initialState.addPatient, action) => {
    switch (action.type) {
        case ADD_PATIENT:
            return { addPatient: action.patient };
        case ADD_PATIENT_FAIL:
            return { error: action.patient };
        default: return state;
    }

};

export const editPatientReducer = (state = initialState.editPatient, action) => {
    switch (action.type) {
        case EDIT_PATIENT:
            return { editPatient: action.patient };
        case EDIT_PATIENT_FAIL:
            return { error: action.patient };
        default: return state;
    }

};


export const searchPatientReducer = (state = initialState.searchPatient, action) => {
    switch (action.type) {
        case SEARCH_PATIENT:
            return { searchPatient: action.patient };
        case SEARCH_PATIENT_FAIL:
            return { error: action.patient };
        default: return state;
    }

};

