import axios from "axios";
const BaseUrl = "http://localhost:8000/api/v1";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const getLoginData = (values) => async (dispatch) => {

    try {
        console.log(values)
        const login = await axios.post(`${BaseUrl}/auth/login/password/`, values)
        console.log("response login: ", login.data)
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: login,
        });

    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL, payload: 'error',
        });
    }
};