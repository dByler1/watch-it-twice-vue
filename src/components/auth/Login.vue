<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Login</h1>
                <form @submit.prevent="login()">
                     <div v-for="(message, index) of formErrors" :key="index" >
                        <ErrorMessage :message="message" ></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="loginData.email" type="email" id="email" name="email" class="form-control" placeholder="Email" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="loginData.password" type="password" id="password" name="password" class="form-control" placeholder="Enter Password" required/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
                <p class="lead mt-4">
                    No Account? <router-link :to="'/register'">Register</router-link>
                </p>
                <p class="lead mt-4">
                    Forgot Password? <a href="/users/reset-password">Reset Password</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import ErrorMessage from '../resources/elements/ErrorMessage';
export default {
    name: "Login",
    components: {
        ErrorMessage
    },
    data () {
        return {
            formErrors: [],
            loginData: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login() {
            
            //this.$store.dispatch('login', this.loginData)
            this.$store.dispatch('AUTH_REQUEST_ACTION', this.loginData)
            .then(res => { // eslint-disable-line no-unused-vars
                this.$router.push( { path: '/feed' } )
            })
            .catch(err => {
                if(!err.response.data) {
                    return this.formErrors.push(err.response.statusText)
                }
                return this.formErrors.push(err.response.data)
            })
        }
    },
    created: function() {
    }
}
</script>