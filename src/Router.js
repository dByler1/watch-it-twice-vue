import Vue from 'vue';
import VueRouter from 'vue-router';

import Search from './components/movie/Search.vue';
import List from './components/movie/List.vue';
import Detail from './components/movie/Detail.vue';
import Register from './components/auth/Register.vue';
import Login from './components/auth/Login.vue';
import Settings from './components/user/Settings.vue';
import Profile from './components/user/Profile.vue';
import Feed from './components/social/Feed.vue'
import ForgotPassword from './components/auth/ForgotPassword.vue'
import NewPassword from './components/auth/NewPassword.vue'
import store from './store';
import { PAGE_ERROR_ACTION } from "@/store/actions.type"; 

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Search },
    { path: '/list/:search_term', component: List, props: true },
    { path: '/detail/:imdbID', component: Detail, props: true },
    { path: '/register', component: Register },
    { path: '/login', component: Login},
    { path: '/new-password/:token', component: NewPassword},
    { path: '/reset-password', component: ForgotPassword},
    { path: '/settings', component: Settings,
      beforeEnter (to, from, next) {
          if(store.state.auth.token) {
              next()
          } else {
              console.log('router guard settings')
              const errDataObj = {
                  msg: "You have to login to access the settings page",
                  method: 'push'
              }
              store.dispatch(PAGE_ERROR_ACTION, errDataObj)
              next({ path: '/login' })
          }
      }
    },
    { path: '/profile/:userID', component: Profile, props: true },
    { path: '/feed', component: Feed }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});