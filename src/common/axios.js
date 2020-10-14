import axios from 'axios';
import { router } from '../Router';
import store from '../store';
import { API_URL } from './config';

import { AUTH_LOGOUT_ACTION } from "@/store/actions.type";

const token = localStorage.getItem('user-token');

if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}

axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});

//Axios response interceptor

axios.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    console.log(error)
        console.log('axios global error catch' + '\n' + JSON.stringify(error.response))
    if (error.response.status === 403) {
        store.dispatch(AUTH_LOGOUT_ACTION)
        router.push({ path: '/login' })
    }
    return Promise.reject(error);
});

axios.defaults.baseURL = API_URL;