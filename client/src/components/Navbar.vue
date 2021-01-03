<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="logo">
        <router-link class="home-link" to="/">Vuetter</router-link>
      </h1>
      <div class="profile" v-if="isLoggedIn">
        <form @submit.prevent="searchPost">
          <input type="text" v-model="searchTerm"/>
        </form>
        <router-link class="profile-link" to="/profile">{{user.name}}</router-link>
        <router-link class="profile-link" to="/logout">Logout</router-link>
      </div>
      <div class="auth" v-else>
        <router-link class="auth-link" to="/login">Login</router-link>
        <router-link class="auth-link" to="/register">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => {
      return store.getters.user;
    });
    const isLoggedIn = computed(() => {
      return store.getters.isLoggedIn;
    });
    const searchTerm = ref('');
    
    const getProfile = async() => {
      if(!user.value) {
        await store.dispatch('getOwnProfile');
      }
    };

    const searchPost = () => {
      router.push({name: 'Search', query: {term: searchTerm.value}});
      searchTerm.value = '';
    }

    getProfile();

    return {
      isLoggedIn, user, searchTerm, searchPost
    }
  }
};
</script>

<style lang="scss">
.navbar {
  height: 80px;
  background-color: $primary;
  box-shadow: $shadow;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    width: 80vw;
    margin: auto;

    .logo {
      .home-link {
        text-decoration: none;
        font-size: 2.5rem;
        color: $dark-text;
      }
    }

    .profile {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      form {
        display: inline-block;

        input {
        border-radius: 12px;
        border: none;
        font-size: 1.5rem;
        padding: 10px;
        margin-right: 10px;
      }
      }

      .profile-link {
        text-decoration: none;
        font-size: 1.5rem;
        color: $dark-text;
        margin-left: 10px;
        padding: 10px;
        border-radius: 12px;
        transition: 0.3s ease all;

        &:hover {
          background-color: $secondary;
        }
      }
    }

    .auth {
      .auth-link {
        text-decoration: none;
        font-size: 1.5rem;
        color: $dark-text;
        margin: 0 5px;
        padding: 10px;
        border-radius: 12px;
        transition: 0.3s ease all;

        &:hover {
          background-color: $secondary;
        }
      }
    }
  }
}
</style>
