<template>
  <div id="app" class="container">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand class="noGo" tag="a" to="/">
          <img class="navbar-brand-logo" src="./assets/Watch_It_Twice_Logo_Idea.png" alt="Watch It Twice Logo">
        </b-navbar-brand>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="'/'" right>Search</b-nav-item>
            <b-nav-item :to="'/feed/'" right>Feed</b-nav-item>
            <b-nav-item v-if="isAuthenticated" :to="'/profile/' + getUserData.userID">Profile</b-nav-item>
            <b-nav-item v-if="!isAuthenticated" :to="'/register/'" right>Register</b-nav-item>
            <b-nav-item v-if="!isAuthenticated" :to="'/login/'" right>Login</b-nav-item>
            
            <b-nav-item-dropdown right v-if="isAuthenticated">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{getUserData.username}}</em>
              </template>
              <b-dropdown-item :to="'/settings/'">Settings</b-dropdown-item>
              <b-dropdown-item @click="signOut()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
        <div v-for="(message, index) of pageErrors" :key="index" >
          <ErrorMessage :message="message"></ErrorMessage>
          <!-- <b-alert variant="danger" dismissible show>
              {{message}}
          </b-alert> -->
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './components/resources/elements/Loader'
import ErrorMessage from './components/resources/elements/ErrorMessage';
import { AUTH_LOGOUT_ACTION, USER_DATA_REQUEST_ACTION } from "@/store/actions.type";
export default {
  name: 'app',
  components: {
    ErrorMessage
  },
  data () {
    return {
 
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch(AUTH_LOGOUT_ACTION)
      this.$router.push({ path: '/login'})
    },
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'getUserData',
      'pageErrors'
    ])
  },
  beforeCreate() {
    if(this.$store.getters.isAuthenticated && !this.$store.getters.getUserData.email) {
      this.$store.dispatch(USER_DATA_REQUEST_ACTION)
    }
  }
  
}
</script>

<style lang="css">

  .navbar-brand-logo {
    max-width: 110px;
    border: 2px solid #895061;
    padding: 5px;
    border-radius: 5px;
  }

  .router-link-exact-active:not(.noGo) {
    border-bottom: 2px solid #895061;
  }

  .pre-wrap {
    white-space: pre-wrap;
  }

  .review-string-background {
    /* background: #f5f5f5; */
    padding: 20px;
    border-radius: 5px;
    /* box-shadow: 0 0 0 3px rgba(137, 80, 97, .2); */
  }

  .review-div-background {
    background: rgba(45, 65, 89, .1);
    padding: 20px;
    border-radius: 10px;
  }
  

</style>
