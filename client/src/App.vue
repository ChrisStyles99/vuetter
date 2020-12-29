<template>
  <Navbar />
  <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0962ea" fill-opacity="1" d="M0,224L48,240C96,256,192,288,288,277.3C384,267,480,213,576,192C672,171,768,181,864,192C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
  <router-view />
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: $bg-color;
  font-family: 'Fira Sans Condensed', sans-serif;
}

.wave-svg {
  position: absolute;
  top: 80px;
  z-index: -1;
}

.container {
  padding-left: 15px;
  padding-right: 15px;
  width: 80vw;
  margin: auto;
}
</style>
