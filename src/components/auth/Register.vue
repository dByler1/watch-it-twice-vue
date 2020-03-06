<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3">
                    <i class="fas fa-user-plus"></i> Register
                </h1>             
                <form @submit.prevent="register()">
                     <div v-for="(message, index) of formErrors" :key="index" >
                        <ErrorMessage :message="message" ></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input v-model="registerData.name" type="name" id="name" name="name" class="form-control" placeholder="Enter Name" required/>
                    </div>
                    <div class="form-group">
                        <label for="email" >Email</label>
                        <input v-model="registerData.email" type="email" id="email" name="email" class="form-control" placeholder="Enter Email" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="registerData.password" type="password" id="password" name="password" class="form-control" placeholder="Create Password" required/>
                    </div>
                    <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <input v-model="registerData.password2" type="password" id="password2" name="password2" class="form-control" placeholder="Confirm Password" required/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">
                        Register
                    </button>
                </form>
                <p class="lead mt-4">Have An Account? <router-link :to="'/login'"> Login</router-link></p>
            </div>
        </div>
    </div>
</template>
<script>
import ErrorMessage from '../resources/elements/ErrorMessage';
export default {
    name: "Register",
    components: {
        ErrorMessage
    },
    data () {
        return {
            registerData: {
                name: '',
                email: '',
                password: '',
                password2: ''
            },
            formErrors: []
        }
    },
    methods: {
        register() {
            if (this.registerData.password != this.registerData.password2) {
                return this.formErrors.push('Password confirmation does not match password')
            }
            this.$store.dispatch('REGISTER_REQUEST_ACTION', this.registerData)
            .then((res) => { // eslint-disable-line no-unused-vars
                this.$router.push({ path: '/login'})
            })
            .catch(error => {
                error.data.errors.forEach(node => {
                    this.formErrors.push(node.msg)
                });
                
            })
            
        }
    }
}
</script>