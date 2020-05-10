import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/postvideo',
      name: 'postVideo',
      component: () => import(/* webpackChunkName: "video" */ './views/PostVideo.vue'),
    },
    {
      path: '/video/:videoId',
      name: 'showVideo',
      component: () => import(/* webpackChunkName: "video" */ './views/ShowVideo.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import(/* webpackChunkName: "notice" */ './views/Notice.vue'),
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: () => import(/* webpackChunkName: "user" */ './views/SignIn.vue'),
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: () => import(/* webpackChunkName: "user" */ './views/SignUp.vue'),
    },
    {
      path: '/user/:userID',
      name: 'User',
      component: () => import(/* webpackChunkName: "user" */ './views/ShowUser.vue'),
    },
  ],
});
