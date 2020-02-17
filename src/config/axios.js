import axios from 'axios';
import { router } from '../Router';
import { store } from '../store';
let development = process.env.NODE_ENV !== 'production'

const token = localStorage.getItem('user-token');

if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error.response.data)
    if (error.response.data.error.statusCode === 401) {
        store.dispatch('AUTH_LOGOUT_ACTION')
        router.push({ path: '/login' })
    }
    return Promise.reject(error)
});

axios.defaults.baseURL = development ? 'http://localhost:3000/' : 'https://git.heroku.com/watch-it-twice.git/';