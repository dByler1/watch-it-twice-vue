<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>Reset Password</h1>
                <form @submit.prevent="resetPassword()">
                     <div v-for="(message, index) of formErrors" :key="index" >
                        <ErrorMessage :message="message" ></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" id="email" name="email" class="form-control" placeholder="Email" required/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Send Reset Password Email</button>
                </form>
                <p class="lead mt-4">
                    No Account? <router-link :to="'/register'">Register</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import ErrorMessage from '../resources/elements/ErrorMessage';
import axios from 'axios';
export default {
    name: "ForgotPassword",
    components: {
        ErrorMessage
    },
    data () {
        return {
            formErrors: [],
            email: null
        }
    },
    methods: {
        resetPassword() {
            const payload = {email: this.email}
            axios.post('reset/get-token', payload)
                .then(res => {
                    return this.$router.push( { path: '/new-password' } )
                })
                .catch(err => { 
                    console.log(err)
                    this.formErrors.push(err.response.data.msg)
                });
        }
    }
}
</script>