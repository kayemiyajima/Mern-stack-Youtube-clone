import axios from 'axios';

const URL = 'http://localhost:5000/api/users';

export const addUser = (dataToRegister) => axios.post(`${URL}/register`, dataToRegister);
export const loginUser = (dataToSubmit) => axios.post(`${URL}/login`, dataToSubmit, { withCredentials: true, credentials: 'include' });
export const authUser = () => axios.get(`${URL}/auth`, { withCredentials: true, credentials: 'include' });
export const logoutUser = () => axios.get(`${URL}/logout`, { withCredentials: true, credentials: 'include' });