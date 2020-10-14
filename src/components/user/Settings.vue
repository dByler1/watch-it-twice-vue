<template>
    <!-- {{> messages }} -->
    <div>
         <div class="row">
            <div class="col-12">
                <h1 class="mt-4">Settings</h1>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name: {{getUserData.username}} 
                        
                        <button role="button" 
                            class="btn-sm btn-outline-secondary" 
                            @click="showForm('nameForm')">
                            <b-icon-pencil></b-icon-pencil>
                        </button>
                        <form class="form-inline" @submit.prevent="changeName()" v-show="showNameForm">
                            <div class="form-group mx-sm-3 mb-2">
                                <label for="newName" class="sr-only">New Name</label>
                                <input type="text" required class="form-control" id="newName" placeholder="New Name" v-model="newName">
                            </div>
                            <button type="submit" class="btn btn-primary mb-2">Change Name</button>
                            <button role="button" 
                                class="btn-sm btn-outline-secondary" 
                                @click="showForm('nameForm')">
                                <b-icon-eye-slash></b-icon-eye-slash>
                            </button>
                        </form>
                    </li>
                    <li class="list-group-item">Email: {{getUserData.email}} 
                        <button type="button" 
                            class="btn-sm btn-outline-secondary" 
                            @click="showForm('emailForm')">
                            <b-icon-pencil></b-icon-pencil>
                        </button>
                        <form class="form-inline" @submit.prevent="changeEmail()" v-show="showEmailForm">
                            <div class="form-group mx-sm-3 mb-2">
                                <label for="newEmail" class="sr-only">New Email</label>
                                <input type="email" class="form-control" id="newEmail"  required placeholder="New Email" v-model="newEmail">
                            </div>
                            <button type="submit" class="btn btn-primary mb-2">Change Email</button>

                            <button role="button" 
                                class="btn-sm btn-outline-secondary" 
                                @click="showForm('emailForm')">
                                <b-icon-eye-slash></b-icon-eye-slash>
                            </button>
                        </form>
                    </li>
                    <li class="list-group-item">
                        Change Password: 
                        <button type="button" 
                            class="btn-sm btn-outline-secondary" 
                            @click="showForm('passwordForm')">
                            <b-icon-pencil></b-icon-pencil>
                        </button>
                        <form class="form-inline" @submit.prevent="changePassword()" v-show="showPasswordForm">
                            <div class="form-group mx-sm-3 mb-2">
                                <label for="newPassword" class="sr-only">New Password</label>
                                <input type="password" class="form-control" id="newPassword"  required placeholder="New Password" v-model="newPassword">
                            </div>
                            <div class="form-group mx-sm-3 mb-2">
                                <label for="newPassword2" class="sr-only">Confirm Password</label>
                                <input type="password" class="form-control" id="newPassword2"  required placeholder="Confirm Password" v-model="newPassword2">
                            </div>
                            <button type="submit" class="btn btn-primary mb-2">Change Password</button>

                            <button role="button" 
                                class="btn-sm btn-outline-secondary" 
                                @click="showForm('passwordForm')">
                                <b-icon-eye-slash></b-icon-eye-slash>
                            </button>
                        </form>
                    </li>
                     <li class="list-group-item">Delete Account: 
                        <button type="button" 
                            class="btn btn-danger" 
                            @click="deleteAccount()">
                            Delete
                        </button>
                    </li> 

                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';// eslint-disable-line no-unused-vars

import { USER_DATA_REQUEST_ACTION, AUTH_LOGOUT_ACTION } from "@/store/actions.type"; 

export default {
    name: 'Settings',
    data () {
        return {
            showNameForm: false,
            showEmailForm: false,
            showPasswordForm: false,
            showDeleteAccount: false,
            newName: null,
            newEmail: null,
            newPassword: null,
            newPassword2: null
        }
    },
    methods: {
        showForm (el) {// eslint-disable-line no-unused-vars
            switch (el) {
            case 'nameForm':
                this.showNameForm = this.showNameForm ? false : true;
                break;
            case 'emailForm':
                this.showEmailForm = this.showEmailForm ? false : true;
                break;
            case 'passwordForm':
                this.showPasswordForm = this.showPasswordForm ? false : true;
                break;
            }
        },
        changeName () {
            console.log(this.$store.getters.jwtData.userID)
            axios({
                method: "POST",
                url: 'user/change-name',
                data: {
                    userID: this.$store.getters.jwtData.userID,
                    name: this.newName
                }
            })
            .then(res => { // eslint-disable-line no-unused-vars
                this.$store.dispatch(USER_DATA_REQUEST_ACTION);
                this.showNameForm = false;
                this.newName = null;
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
        },
        changePassword () {
            if (this.newPassword != this.newPassword2) {
                return
            }
            axios({
                method: "POST",
                url: 'auth/change-password',
                data: {
                    userID: this.$store.getters.jwtData.userID,
                    password: this.newPassword,
                    password2: this.newPassword2
                }
            })
            .then(res => {
                this.showPasswordForm = false;
                this.newPassword = null;
                this.newPassword2 = null;
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
        },
        changeEmail () {
            axios({
                method: "POST",
                url: 'user/change-email',
                data: {
                    userID: this.$store.getters.jwtData.userID,
                    email: this.newEmail 
                }
            })
            .then(res => {// eslint-disable-line no-unused-vars
                this.$store.dispatch(USER_DATA_REQUEST_ACTION)
                this.showEmailForm = false;
                this.newEmail = null;
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
        },
        deleteAccount () {
            axios({
                method: "POST",
                url: 'user/delete-account',
                data: {
                    userID: this.$store.getters.jwtData.userID
                }
            })
            .then(res => {// eslint-disable-line no-unused-vars
                this.$store.dispatch(AUTH_LOGOUT_ACTION)
                this.$router.push( { path: '/' } )
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
        }
    },
    computed: {
        ...mapGetters(['getUserData', 'jwtData'])
    }
}
</script>