import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || null,
        status: null,
        userData: {
            email: null,
            username: null,
            userID: null
        }
    },
    mutations: {
        AUTH_REQUEST_MUTATION: (state) => {
            state.status = 'loading';
        },
        AUTH_SUCCESS_MUTATION: (state, token) => {
            state.status = 'success';
            state.token = token;
        },
        AUTH_ERROR_MUTATION: (state) => {
            state.status = 'error';
        },
        AUTH_LOGOUT_MUTATION: (state) => {
            state.token = null;
            state.status = null;
        },
        ADD_USER_DATA_MUTATION: (state, data) => {
            state.userData.email = data.data.email;
            state.userData.username = data.data.name;
            state.userData.userID = data.data._id;
        },
        REMOVE_USER_DATA_MUTATION: (state) => {
            state.userData.email = null;
            state.userData.username = null;
            state.userData.userID = null;
        }

    },
    actions: {
        REGISTER_REQUEST_ACTION({ commit }, registerData) { // eslint-disable-line no-unused-vars
            return new Promise((resolve, reject) => {
                axios.post('auth/register', registerData)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => { 
                        reject(err.response)
                    })
            })
        },
        AUTH_REQUEST_ACTION: ({ commit, dispatch }, userData) => { // eslint-disable-line no-unused-vars
            return new Promise((resolve, reject) => { 
                commit('AUTH_REQUEST_MUTATION')
                axios({ 
                        url: 'auth/login', 
                        auth: {
                            username: userData.email,
                            password: userData.password
                        }, 
                        method: 'POST' })
                    .then(res => {
                        console.log(res)
                        const token = res.data.token
                        localStorage.setItem('user-token', token) // store the token in localstorage
                        axios.defaults.headers.common['Authorization'] = token // Add an axios default header
                        commit('AUTH_SUCCESS_MUTATION', token)
                        // token is available, dispatch other actions related to a logged in user
                        dispatch('AUTH_SET_LOGOUT_TIMER_ACTION') // set timer for logout
                        dispatch('USER_DATA_REQUEST_ACTION')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('AUTH_ERROR_MUTATION', err)
                        localStorage.removeItem('user-token') // if the request fails, remove any possible user token
                        console.log(err)
                        console.log(err.response)
                        reject(err)
                    })
            })
        },
        AUTH_LOGOUT_ACTION: ({ commit, dispatch }) => { // eslint-disable-line no-unused-vars
            return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
                commit('AUTH_LOGOUT_MUTATION')
                commit('REMOVE_USER_DATA_MUTATION')
                localStorage.removeItem('user-token') // clear the user's token from localstorage
                // remove the axios default header
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        AUTH_SET_LOGOUT_TIMER_ACTION({ commit }) {
            setTimeout(() => {
                commit('AUTH_LOGOUT_MUTATION')
                commit('REMOVE_USER_DATA_MUTATION')
                localStorage.removeItem('user-token') // clear the user's token from localstorage
                // remove the axios default header
                delete axios.defaults.headers.common['Authorization']
            }, 3600 * 1000) // timer for 60 minutes
        },
        USER_DATA_REQUEST_ACTION({ commit }) {
            axios({
                url: 'user/data',
                method: 'GET'
            })
            .then(data => {
                commit('ADD_USER_DATA_MUTATION', (data))
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
        }
    },
    getters: {
        jwt: state => state.token,
        jwtData: (state, getters) => state.token ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
        isAuthenticated: (state)  =>  state.token ? true : false,   
        getUserData: (state) => state.userData
    }
})