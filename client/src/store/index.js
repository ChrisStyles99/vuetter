import { createStore } from 'vuex';
import axios from 'axios';
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api';

export default createStore({
  state: {
    isLoggedIn: document.cookie.includes('isLoggedIn=true') === true ? true : false,
    user: false,
    posts: false,
    singlePost: false,
    profile: [],
    loginError: false,
    registerError: false,
    addPostError: false,
    getProfilesError: false,
    followingError: false,
    followingMessage: false,
    unfollowError: false,
    unfollowMessage: false,
    singlePostError: false
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
    },
    get_user(state, data) {
      state.user = data;
    },
    friend_posts(state, data) {
      state.posts = data;
    },
    add_post_error(state, data) {
      state.addPostError = data;
    },
    add_post(state, data) {
      state.user.posts.unshift(data);
      state.posts.unshift({
        name: state.user.name,
        username: state.user.username,
        content: data.content,
        likes: data.likes,
        user_id: state.user.id,
        id: data.id
      });
    },
    get_profiles_error(state) {
      state.getProfilesError = "Sorry, we're having trouble getting the user profile";
    },
    get_profile(state, data) {
      state.profile = data;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = false;
      state.posts = false;
      state.singlePost = [];
      state.profile = [];
    },
    follow_error(state, data) {
      state.followingError = data;
    },
    follow(state, data) {
      state.followingMessage = data;
    },
    unfollow_error(state, data) {
      state.unfollowError = data;
    },
    unfollow(state, data) {
      state.unfollowMessage = data;
    },
    single_post_error(state) {
      state.singlePostError = "We couldn't retrieve the post data";
    },
    single_post(state, data) {
      state.singlePost = data;
    },
    like_post(state, data) {
      state.user.likedPosts.push(data);
    },
    remove_like(state, id) {
      state.user.likedPosts.filter(like => like.id != id);
    },
    remove_post(state, id) {
      state.user.posts.filter(post => post.id != id);
    }
  },
  actions: {
    async register({commit}, data) {
      const res = await axios.post(`${baseUrl}/users/register`, data);
      if(res.data.error === true) {
        commit('register_error', res.data.msg);
      } else {
        commit('register_success');
      }
    },
    async login({commit}, data) {
      const res = await axios.post(`${baseUrl}/users/login`, data);
      if(res.data.error === true) {
        commit('login_error', res.data.msg);
      } else {
        commit('login_success');
        localStorage.setItem('loggedIn', true);
      }
    },
    async getOwnProfile({commit}) {
      const res = await axios.get(`${baseUrl}/users/profile`);
      if(!res.data.error) {
        commit('get_user', res.data);
      }
    },
    async getPosts({commit}) {
      const res = await axios.get(`${baseUrl}/posts/`);
      commit('friend_posts', res.data);
    },
    async getSinglePost({commit}, id) {
      const res = await axios.get(`${baseUrl}/posts/post/${id}`);
      if(res.data.error === true) {
        commit('single_post_error');
      } else {
        commit('single_post', res.data.post);
      }
    },
    async addPost({commit}, data) {
      const res = await axios.post(`${baseUrl}/posts/new-post`, data);
      if(res.data.error === true) {
        commit('add_post_error', res.data.msg);
      } else {
        commit('add_post', res.data);
      }
    },
    async getProfiles({commit}, id) {
      const res = await axios.get(`${baseUrl}/users/profiles/${id}`);
      if(res.data.error === true) {
        commit('get_profiles_error');
      } else {
        commit('get_profile', res.data);
      }
    },
    async logout({commit}) {
      const res = await axios.delete(`${baseUrl}/users/logout`);
      console.log(res.data);
      commit('logout');
    },
    async followUser({commit}, id) {
      const res = await axios.post(`${baseUrl}/users/add-friend/${id}`);
      if(res.data.error === true) {
        commit('follow_error', res.data.msg);
      } else {
        commit('follow', res.data.msg);
      }
    },
    async unfollowUser({commit}, id) {
      const res = await axios.delete(`${baseUrl}/users/remove-friend/${id}`);
      if(res.data.error === true) {
        commit('unfollow_error', res.data.msg);
      } else {
        commit('unfollow', res.data.msg);
      }
    },
    async likePost({commit}, id) {
      const res = await axios.post(`${baseUrl}/posts/like-post/${id}`);
      console.log(res.data);
      if(res.data.error === false) {
        commit('like_post', res.data.post);
      }
    },
    async removeLike({commit}, id) {
      await axios.delete(`${baseUrl}/posts/remove-like/${id}`);
      commit('remove_like', id);
    },
    async removePost({commit}, id) {
      const res = await axios.delete(`${baseUrl}/posts/delete-post/${id}`);
      if(!res.data.error) {
        commit('remove_post', id);
      }
    }
  },
  getters: {
    registerError: state => state.registerError,
    loginError: state => state.loginError,
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
    posts: state => state.posts,
    profile: state => state.profile,
    singlePost: state => state.singlePost,
    getProfilesError: state => state.getProfilesError
  },
  modules: {
  }
})
