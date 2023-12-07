import * as api from '../api'; 
import Router from '@/router/index'; 


export const signin = async (formData) =>  {
    try {
        const { data } = await api.signin(formData);
        localStorage.setItem('smartData', JSON.stringify({data}));
        Router.push('/');
    } catch (error) {
        console.log(error)
        return error.response.data.message || error;
    }
}

export const signup = async (formData, redirect) => {
    try {
        const { data } = await api.signup(formData);
        localStorage.setItem('smartData', JSON.stringify({data}));
        if(redirect) {
        Router.push('/');
        }
    } catch (error) {
        console.log(error);
        return error.response.data.message || '';
    }
}

export const isLoggedIn = () => {
    return localStorage.getItem("smartData") == null ? false : true;
}

export const logout = async () => {
    try {
        localStorage.removeItem('smartData');
        Router.push('auth');
    } catch (error) {
        console.log(error)
    }
}