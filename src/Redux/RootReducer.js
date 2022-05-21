
import { combineReducers } from "redux";
import { userLoginReducer } from "./auth/AuthReducer";
import { getPatientsReducer, editPatientReducer, addPatientReducer, searchPatientReducer } from "./Patient/PatientReducer";
const RootReducers = combineReducers(
    {
        userLogin: userLoginReducer,
        patients: getPatientsReducer,
        patient: addPatientReducer,
        epatient: editPatientReducer,
        search: searchPatientReducer,
    }
)

export default RootReducers; 
