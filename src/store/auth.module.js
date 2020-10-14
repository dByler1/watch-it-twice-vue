import axios from 'axios';

import { 
    PAGE_ERROR_ACTION,
    REGISTER_REQUEST_ACTION,
    AUTH_REQUEST_ACTION,
    AUTH_LOGOUT_ACTION,
    AUTH_SET_LOGOUT_TIMER_ACTION,
    USER_DATA_REQUEST_ACTION
 } from "./actions.type";

import { 
    PUSH_PAGE_ERROR_MUTATION, 
    POP_PAGE_ERROR_MUTATION, 
    AUTH_REQUEST_MUTATION, 
    AUTH_SUCCESS_MUTATION, 
    AUTH_ERROR_MUTATION, 
    AUTH_LOGOUT_MUTATION,
    ADD_USER_DATA_MUTATION, 
    REMOVE_USER_DATA_MUTATION
} from "./mutations.type";
const state = {
    token: localStorage.getItem('user-token') || null,
    status: null,
    load: false,
    pageErrors: []
};

const getters = {
    jwt: state => state.token,
    jwtData: (state, getters) => state.token ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
    isAuthenticated: (state)  =>  state.token ? true : false,   
    pageErrors: (state) => state.pageErrors
}

const actions = {
    [PAGE_ERROR_ACTION]({ commit }, node) {
        
        if(node.method === 'push') {
            console.log(node.msg)
            commit(PUSH_PAGE_ERROR_MUTATION, node.msg)  
        } else {
            commit(POP_PAGE_ERROR_MUTATION, node.msg) 
        }
    },
    [REGISTER_REQUEST_ACTION]({ commit }, registerData) { // eslint-disable-line no-unused-vars
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
    [AUTH_REQUEST_ACTION]: ({ commit, dispatch }, userData) => { // eslint-disable-line no-unused-vars
        // console.log(JSON.stringify(userData))
        return new Promise((resolve, reject) => { 
            commit(AUTH_REQUEST_MUTATION)
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
                    commit(AUTH_SUCCESS_MUTATION, token)
                    // token is available, dispatch other actions related to a logged in user
                    dispatch(AUTH_SET_LOGOUT_TIMER_ACTION) // set timer for logout
                    dispatch(USER_DATA_REQUEST_ACTION)
                    resolve(res)
                })
                .catch(err => {
                    commit(AUTH_ERROR_MUTATION, err)
                    localStorage.removeItem('user-token') // if the request fails, remove any possible user token
                    console.log(err)
                    console.log(err.response)
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT_ACTION]: ({ commit, dispatch }) => { // eslint-disable-line no-unused-vars
        return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
            commit(AUTH_LOGOUT_MUTATION)
            commit(REMOVE_USER_DATA_MUTATION)
            localStorage.removeItem('user-token') // clear the user's token from localstorage
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    [AUTH_SET_LOGOUT_TIMER_ACTION]({ commit }) {
        setTimeout(() => {
            commit(AUTH_LOGOUT_MUTATION)
            commit(REMOVE_USER_DATA_MUTATION)
            localStorage.removeItem('user-token') // clear the user's token from localstorage
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
        }, 3600 * 1000) // timer for 60 minutes
    }
};

const mutations = {
    [PUSH_PAGE_ERROR_MUTATION](state, item ) {
        
        state.pageErrors.push(item)
    },
    [POP_PAGE_ERROR_MUTATION](state, item) {
        let newData = [];
        state.pageErrors.forEach(node => {
            if (node.Type != item) {
                newData.push(node)
            }
        });
        return newData
    },
    [AUTH_REQUEST_MUTATION](state) {
        state.status = 'loading';
    },
    [AUTH_SUCCESS_MUTATION](state, token) {
        state.status = 'success';
        state.token = token;
    },
    [AUTH_ERROR_MUTATION](state) {
        state.status = 'error';
    },
    [AUTH_LOGOUT_MUTATION](state) {
        state.token = null;
        state.status = null;
    }

};

export default {
  state,
  actions,
  mutations,
  getters
};