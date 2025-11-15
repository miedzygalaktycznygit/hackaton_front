//import axios from 'axios';
import api from '../lib/axiosInstance';
import type { LoginFormData, RegisterFormData } from '../lib/validation';

export const loginUser = async (data: LoginFormData) => {
    //axios.post('/api/login', data);
    const response = await api.post('/auth/signin', data);
    return response.data.token;
};

export const registerUser = async (data: RegisterFormData) => {
    //axios.post('/api/register', data);
    const response = await api.post('/auth/signup', data);
    return response.data;
}