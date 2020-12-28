<template>
  <div class="register container">
    <div class="register-form">
      <h1>Register</h1>
      <p class="error-msg" v-if="!validFields">Please fill all the fields</p>
      <p class="error-msg" v-if="error">{{error}}</p>
      <form @submit.prevent="register">
        <div class="form-input">
          <input
            type="text"
            placeholder="Enter your username or email"
            id="name"
            required
            v-model="name"
          />
          <label class="input-label" for="name">Name:</label>
        </div>
        <div class="form-input">
          <input
            type="text"
            placeholder="Enter your username or email"
            id="username"
            required
            v-model="username"
          />
          <label class="input-label" for="username">Username:</label>
        </div>
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
        <button type="submit">Register</button>
      </form>
      <p>Already having an account? <router-link class="register-link" to="/login">Login now</router-link></p>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
 
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const name = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const validFields = ref(true);
    const error = computed(() => {
      return store.getters.registerError;
    });

    const register = async() => {
      if(name.value === '' || username.value === '' || email.value === '' || password.value === '') {
        return validFields.value = false;
      }

      const data = {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value
      }
      await store.dispatch('register', data);

      if(error.value) {
        return
      } else {
        router.push('/login');
      }
    };

    return {
      register,
      name, username, email, password, error, validFields
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  height: calc(100vh - 150px);

  .register-form {
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