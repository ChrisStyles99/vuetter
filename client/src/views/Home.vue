<template>
  <div class="home container">
    <div class="profile-information">
      <h1>Welcome, {{user.name}}!</h1>
      <h2>@{{user.username}}</h2>
    </div>
    <div class="posts">
      <AddPost />
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import AddPost from '@/components/AddPost.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Home',
  components: {
    Post,
    AddPost
  },
  setup() {
    const store = useStore();
    const posts = computed(() => {
      return store.getters.posts;
    });

    const user = computed(() => {
      return store.getters.user;
    });

    const getPosts = async() => {
      if(!posts.value) {
        await store.dispatch('getPosts');
      }
      
      if(!user.value) {
        await store.dispatch('getOwnProfile');
      }
    };

    getPosts();

    return {
      posts, user
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: grid;
    grid-template-columns: 20% 2% 60% 18%;
    height: calc(100vh - 80px);

    .profile-information {
      background-color: $bg-color;
      height: 20vh;
      border-radius: 12px;
      box-shadow: $shadow;
    }

    .posts {
      overflow-y: scroll;
      grid-column: 3 / 4;
    }
  }
</style>