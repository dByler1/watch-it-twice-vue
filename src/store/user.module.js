import axios from 'axios';

import { 
    REGISTER_REQUEST_ACTION,
    USER_DATA_REQUEST_ACTION
 } from "./actions.type";

import { 
    ADD_USER_DATA_MUTATION,
    REMOVE_USER_DATA_MUTATION
} from "./mutations.type";
const state = {
    userData: {
        email: null,
        username: null,
        userID: null
    }
};

const getters = {
    getUserData: (state) => state.userData
}

const actions = {
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
    [USER_DATA_REQUEST_ACTION]({ commit }) {
        axios({
            url: 'user/data',
            method: 'GET'
        })
        .then(data => {
            commit(ADD_USER_DATA_MUTATION, (data))
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
        })
    }
};

const mutations = {
    [ADD_USER_DATA_MUTATION](state, data) {
        state.userData.email = data.data.email;
        state.userData.username = data.data.name;
        state.userData.userID = data.data._id;
    },
    [REMOVE_USER_DATA_MUTATION](state) {
        state.userData.email = null;
        state.userData.username = null;
        state.userData.userID = null;
    }

};

export default {
  state,
  actions,
  mutations,
  getters
};