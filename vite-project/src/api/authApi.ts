import axios from 'axios';
import type { LoginFormData, RegisterFormData } from '../lib/validation';

export const loginUser = async (data: LoginFormData) => {
    //axios.post('/api/login', data);
    const response = await axios.post('/api/login', data);
    return response.data;
};

export const registerUser = async (data: RegisterFormData) => {
    //axios.post('/api/register', data);
    const response = await axios.post('/api/register', data);
    return response.data;
}