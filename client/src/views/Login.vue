<template>
  <div class="login container">
    <div class="login-form">
      <h1>Login</h1>
      <p class="error-msg" v-if="!validFields">Please fill all the inputs</p>
      <p class="error-msg" v-if="error">{{error}}</p>
      <form @submit.prevent="login">
        <div class="form-input">
          <input
            type="email"
            placeholder="Enter your username or email"
            id="email"
            required
            v-model="email"
          />
          <label class="input-label" for="email">Email:</label>
        </div>
        <div class="form-input">
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            required
            v-model="password"
          />
          <label class="input-label" for="password">Password:</label>
        </div>
        <button type="submit">Log in!</button>
      </form>
      <p>
        Don't have an account yet?
        <router-link class="register-link" to="/register">Register now!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const validFields = ref(true);
    const error = computed(() => {
      return store.getters.loginError;
    });

    const login = async() => {
      if(email.value === '' || password.value === '') {
        return validFields.value = false;
      }

      const data = {
        email: email.value,
        password: password.value
      }

      await store.dispatch('login', data);

      if(error.value) return 

      router.push('/');
    }

    return {
      login, email, password, validFields, error
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: calc(100vh - 150px);

  .login-form {
    width: 30%;
    box-shadow: $shadow;
    margin: auto;
    border-radius: 12px;
    background-color: $bg-color;

    h1 {
      text-align: center;
    }

    .error-msg {
      color: $error-text;
    }

    form {
      width: 90%;
      margin: auto;

      .form-input {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;

        .input-label {
          order: -1;
          font-size: 1.2rem;
        }

        input {
          padding: 10px 15px;
          background-color: $bg-color;
          border: none;
          border-bottom: 3px solid #a5a5a5;
          outline: none;

          &:focus {
            border-bottom: 3px solid $third;

            + .input-label {
              color: $third;
            }
          }

          &:valid {
            border-bottom: 3px solid $third;

            + .input-label {
              color: $third;
            }
          }
        }
      }

      button {
        width: 100%;
        border-radius: 12px;
        font-size: 1.2rem;
        border: none;
        background: $primary;
        background: linear-gradient(
          45deg,
          $primary 0%,
          $third 53%
        );
        color: $dark-text;
        padding: 10px 0;
        cursor: pointer;
      }
    }

    p {
      text-align: center;

      .register-link {
        color: $secondary;
        text-decoration: none;
      }
    }
  }
}
</style>
