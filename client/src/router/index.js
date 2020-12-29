import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */'../views/Profile.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/Login.vue'),
    meta: {requiresGuest: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/Register.vue'),
    meta: {requiresGuest: true}
  },
  {
    path: '/profiles/:id',
    name: 'Profiles',
    component: () => import(/* webpackChunkName: "userProfiles" */ '../views/UserProfiles.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logout" */'../views/Logout.vue'),
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(item => item.meta.requiresAuth);
  const requiresGuest = to.matched.some(item => item.meta.requiresGuest);

  if(requiresAuth && store.state.isLoggedIn === false) {
    next({name: 'Login'});
  } else if(requiresGuest && store.state.isLoggedIn === true){
    next({name: 'Home'});
  } else {
    next();
  }
});

export default router
