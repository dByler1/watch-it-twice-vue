<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Login</h1>
                <div v-if="showSuccess">
                   <b-alert 
                    variant="success" 
                    show>
                        Registration Successful. Please login.
                    </b-alert>  
                </div>
                   <div v-if="showError">
                   <b-alert 
                    variant="danger" 
                    show>
                        {{ errorMsg }}
                    </b-alert>  
                </div>
                
                <form @submit.prevent="login()">
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

export default {
    name: "Login",
    data () {
        return {
            showSuccess: false,
            showError: false,
            errorMsg: null,
            loginData: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login() {
            this.showSuccess = false;
            
            //this.$store.dispatch('login', this.loginData)
            this.$store.dispatch('AUTH_REQUEST_ACTION', this.loginData)
            .then(res => { // eslint-disable-line no-unused-vars
                this.$router.push( { path: '/' } )
            })
            .catch(err => {
                this.showError = true;
                this.errorMsg = err.data.statusText;
            })
        }
    },
    created: function() {
    }
}
</script>