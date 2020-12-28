<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="logo">
        <router-link class="home-link" to="/">Vuetter</router-link>
      </h1>
      <div class="profile" v-if="isLoggedIn">
        <input type="text" />
        <router-link class="profile-link" to="/profile">Profile name</router-link>
      </div>
      <div class="auth" v-else>
        <router-link class="auth-link" to="/login">Login</router-link>
        <router-link class="auth-link" to="/register">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
  setup() {
    const store = useStore();

    const isLoggedIn = computed(() => {
      return store.getters.isLoggedIn;
    });

    return {
      isLoggedIn
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

      align-items: center;

      input {
        border-radius: 12px;
        border: none;
        padding: 10px;
        margin-right: 10px;
      }

      .profile-link {
        text-decoration: none;
        font-size: 1.5rem;
        color: $dark-text;
        margin-left: 10px;
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
