<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: $bg-color;
    font-family: 'Fira Sans Condensed', sans-serif;
  }
</style>
