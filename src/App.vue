<template>
  <div id="app" class="container">
      <b-navbar toggleable="lg" type="light">
        <router-link tag="a" to="/">
          <b-navbar-brand>
            <img class="navbar-brand-logo" src="./assets/Watch_It_Twice_Logo_Idea.png" alt="Kitten">
          </b-navbar-brand>
        </router-link>  
        <b-navbar-nav>
          <b-nav-item :to="'/feed/'" right>Feed</b-nav-item>
        </b-navbar-nav>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!isAuthenticated" :to="'/register/'" right>Register</b-nav-item>
            <b-nav-item v-if="!isAuthenticated" :to="'/login/'" right>Login</b-nav-item>
            
            <b-nav-item-dropdown right v-if="isAuthenticated">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{getUserData.username}}</em>
              </template>
              <b-dropdown-item :to="'/profile/' + getUserData.userID">Profile</b-dropdown-item>
              <b-dropdown-item :to="'/settings/'">Settings</b-dropdown-item>
              <b-dropdown-item @click="signOut()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("AUTH_LOGOUT_ACTION")
      this.$router.push({ path: '/login'})
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'getUserData'
    ])
  },
  beforeCreate() {
    if(this.$store.getters.isAuthenticated && !this.$store.getters.getUserData.email) {
      this.$store.dispatch('USER_DATA_REQUEST_ACTION')
    }
  }
  
}
</script>

<style>
  .navbar-brand-logo {
    max-width: 100px;
  }

  .pre-wrap {
    white-space: pre-wrap;
  }
</style>
