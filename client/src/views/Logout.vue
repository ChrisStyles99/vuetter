<template>
  <h1>Logout</h1>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = async() => {
      await store.dispatch('logout');
      router.push('/login');
    };
    logout();
  }
}
</script>

<style>

</style>