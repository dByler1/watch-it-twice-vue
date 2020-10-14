<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>Create New Password</h1>
                <div v-for="(message, index) of formErrors" :key="index" >
                    <ErrorMessage :message="message" ></ErrorMessage>
                </div>
                <form class="form-inline" @submit.prevent="changePassword()">
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="newPassword" class="sr-only">New Password</label>
                        <input type="password" class="form-control" id="newPassword"  required placeholder="New Password" v-model="newPassword">
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="newPassword2" class="sr-only">Confirm Password</label>
                        <input type="password" class="form-control" id="newPassword2"  required placeholder="Confirm Password" v-model="newPassword2">
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Change Password</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import ErrorMessage from '../resources/elements/ErrorMessage';
import axios from 'axios';
export default {
    name: "NewPassword",
    props: ['token'],
    components: {
        ErrorMessage
    },
    data () {
        return {
            formErrors: [],
            newPassword: null,
            newPassword2: null
        }
    },
    methods: {
         changePassword () {
            if (this.newPassword != this.newPassword2) {
                return
            }
            axios({
                method: "POST",
                url: `reset/new-password/${this.$route.params.token}`,
                data: {
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
    }
}
</script>