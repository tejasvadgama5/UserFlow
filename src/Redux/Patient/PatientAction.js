

import axios from "axios";
export const GET_PATIENTS_DATA = "GET_PATIENTS_DATA";
export const GET_PATIENTS_FAIL = "GET_PATIENTS_FAIL";

export const ADD_PATIENT = "ADD_PATIENT";
export const ADD_PATIENT_FAIL = "ADD_PATIENT_FAIL";

export const EDIT_PATIENT = "EDIT_PATIENT";
export const EDIT_PATIENT_FAIL = "EDIT_PATIENT_FAIL";

export const SEARCH_PATIENT = "SEARCH_PATIENT";
export const SEARCH_PATIENT_FAIL = "SEARCH_PATIENT_FAIL";

const BaseUrl = "http://localhost:8000/api/v1";

export const getPatients = () => async (dispatch) => {

    try {
        const response = await axios.get(`${BaseUrl}/users/`);

        dispatch({ type: GET_PATIENTS_DATA, patients: response.data });


    } catch (error) {

        dispatch({
            type: GET_PATIENTS_FAIL, patients: 'error',
        });

    }
}

export const addPatient = (values) => async (dispatch) => {


    try {
        const response = await axios.post(`${BaseUrl}/user/`, values['data']);

        dispatch({ type: ADD_PATIENT, patient: response.data });

    } catch (error) {

        dispatch({
            type: ADD_PATIENT_FAIL, patient: 'ERROR',
        });

    }

}

export const editPatient = (values, id) => async (dispatch) => {


    try {
        const response = await axios.put(`${BaseUrl}/user/${id}`, values['data']);
        dispatch({ type: EDIT_PATIENT, patient: response.data });

    } catch (error) {

        dispatch({
            type: EDIT_PATIENT_FAIL, patient: 'ERROR',
        });

    }

}


export const searchPatient = (name) => async (dispatch) => {


    try {
        const response = await axios.get(`${BaseUrl}/users/?search=${name}`,);

        dispatch({ type: SEARCH_PATIENT, patient: response.data });

    } catch (error) {

        dispatch({
            type: SEARCH_PATIENT_FAIL, patient: 'ERROR',
        });

    }

}