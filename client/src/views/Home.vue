<template>
  <div class="home container">
    <div class="profile-information">
      <h1>Welcome, Anon!</h1>
      <p>@username</p>
    </div>
    <div class="posts">
      <AddPost />
      <Post v-for="number in numbers" :key="number" />
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import AddPost from '@/components/AddPost.vue';

export default {
  name: 'Home',
  components: {
    Post,
    AddPost
  },
  setup() {
    const numbers = [1, 2, 3, 4, 5];

    return {
      numbers
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    height: calc(100vh - 80px);

    .profile-information {
      background-color: $bg-color;
      min-height: 20vh;
    }

    .posts {
      overflow-y: scroll;
    }
  }
</style>