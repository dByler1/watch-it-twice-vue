import axios from 'axios';
import { router } from '../Router';
import { store } from '../store';
let development = process.env.NODE_ENV !== 'production'

const token = localStorage.getItem('user-token');

if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}

axios.interceptors.request.use(function (config) {
    store.commit("UPDATE_GLOBAL_LOADING", true) //vuex mutation set loading state to true
    return config;
}, function (error) {
    return Promise.reject(error);
});

//Axios response interceptor

axios.interceptors.response.use(function (config) {
    store.commit("UPDATE_GLOBAL_LOADING", false) //vuex mutation set loading state to false
    return config;
}, function (error) {
    console.log(error.response.data)
    if (error.response.data.error.statusCode === 403) {
        store.dispatch('AUTH_LOGOUT_ACTION')
        router.push({ path: '/login' })
    }
    return Promise.reject(error);
});

axios.defaults.baseURL = development ? 'http://localhost:3000/' : 'https://watch-it-twice.herokuapp.com/';