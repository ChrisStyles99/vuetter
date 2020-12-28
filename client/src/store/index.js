import { createStore } from 'vuex';
import axios from 'axios';
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api';

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('loggedIn') || false,
    user: [],
    posts: [],
    singlePost: [],
    profile: [],
    loginError: false,
    registerError: false
  },
  mutations: {
    register_error(state, error) {
      state.registerError = error;
    },
    register_success(state) {
      state.registerError = false;
    },
    login_error(state, error) {
      state.loginError = error;
    },
    login_success(state) {
      state.loginError = false;
      state.isLoggedIn = true;
    }
  },
  actions: {
    async register({commit}, data) {
      // const {name, username, email, password} = data;
      const res = await axios.post(`${baseUrl}/users/register`, data);
      console.log(res.data);
      if(res.data.error === true) {
        commit('register_error', res.data.msg);
      } else {
        commit('register_success');
      }
    },
    async login({commit}, data) {
      const res = await axios.post(`${baseUrl}/users/login`, data);
      console.log(res.data);
      if(res.data.error === true) {
        commit('login_error', res.data.msg);
      } else {
        commit('login_success');
        localStorage.setItem('loggedIn', true);
      }
    }
  },
  getters: {
    registerError: state => state.registerError,
    loginError: state => state.loginError,
    isLoggedIn: state => state.isLoggedIn
  },
  modules: {
  }
})
