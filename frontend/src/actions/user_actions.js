import * as api from '../api/users';
import { AUTH_USER, CREATE_USER, LOGIN, LOGOUT } from './actionTypes';

export const addUser = (dataToRegister) => async (dispatch) => {
    try {
        const { data } = await api.addUser(dataToRegister);
        dispatch({
            type: CREATE_USER,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const loginUser = (dataToSubmit) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(dataToSubmit);
        dispatch({
            type: LOGIN,
            payload: data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const authUser = () => async (dispatch) => {
    try{
        const { data } = await api.authUser();
        dispatch({
            type: AUTH_USER,
            payload: data
        });
    }catch(error) {
        console.log(error.message)
    }
}

export const logoutUser = (logoutReq) => async (dispatch) => {
    try {
        const { data } = await api.logoutUser(logoutReq)
        dispatch({
            type: LOGOUT,
            payload: data
        });
    } catch (err) {
        console.log(err.message);
    }
}