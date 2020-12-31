<template>
  <div class="home container">
    <div class="profile-information">
      <h1>Welcome, {{user.name}}!</h1>
      <h2>@{{user.username}}</h2>
      <router-link class="profile-btn" to="/profile">See Profile</router-link>
    </div>
    <div class="posts">
      <AddPost />
      <h3 v-if="posts.length == 0">Sorry, you don't have posts to show :(</h3>
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

      h1, h2 {
        margin-left: 10px;
      }

      .profile-btn {
        text-decoration: none;
        color: $third;
        border: 3px solid $third;
        border-radius: 12px;
        padding: 10px 15px;
        font-size: 1.2rem;
        margin-left: 10px;
        transition: 0.3s ease all;

        &:hover {
          color: $dark-text;
          background-color: $third;
        }
      }
    }

    .posts {
      overflow-y: scroll;
      grid-column: 3 / 4;

      h3 {
        color: $dark-text;
      }
    }
  }
</style>