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
import { store } from './store';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Search },
    { path: '/list/:search_term', component: List, props: true },
    { path: '/detail/:imdbID', component: Detail, props: true },
    { path: '/register', component: Register },
    { path: '/login', component: Login},
    { path: '/settings', component: Settings,
      beforeEnter (to, from, next) {
          if(store.state.token) {
              next()
          } else {
              next('/login')
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