import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from './AuthAction';

const initialState = {
    loginData: {},
}

export const userLoginReducer = (state = initialState.loginData, action) => {
    switch (action.type) {

        case USER_LOGIN_SUCCESS:
            return { loading: false, loginData: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
