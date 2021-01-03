<template>
  <div class="search container">
    {{query}}
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute();
    const query = route.query.term;

    console.log(query);

    return {
      query
    }
  }
}
</script>

<style lang="scss" scoped>

</style>