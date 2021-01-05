<template>
  <div class="search container">
    <div class="search-grid">
      <h1>Users found</h1>
      <div class="users">
        <ProfileCard
          v-for="profile in searchedUsers"
          :key="profile.id"
          :profile="profile"
          :user="user.id"
        />
      </div>
      <div class="posts">
        <h1>Posts found</h1>
        <Post
          v-for="post in searchedPosts"
          :key="post.id"
          :post="{
            id: post.id,
            name: post.user.name,
            username: post.user.username,
            content: post.content,
            likes: post.likes,
            createdAt: post.createdAt,
            user_id: post.user_id,
          }"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Post from '@/components/Post.vue';
import ProfileCard from '@/components/ProfileCard.vue';
export default {
  components: {
    Post,
    ProfileCard,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const query = route.query.term;
    const searchedPosts = computed(() => {
      return store.getters.postsSearched;
    });
    const searchedUsers = computed(() => {
      return store.getters.usersSearched;
    });
    const user = computed(() => {
      return store.getters.user;
    });

    const getUsersAndPosts = async (queryString) => {
      if (!user.value) {
        await store.dispatch('getOwnProfile');
      }
      await store.dispatch('searchPosts', queryString);
    };
    getUsersAndPosts(query);

    watch(
      () => route.query.term,
      () => {
        let queryString = route.query.term;
        getUsersAndPosts(queryString);
      }
    );

    return {
      query,
      searchedPosts,
      searchedUsers,
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 25% 50% 25%;

  .search-grid {
    grid-column: 2 / 3;
    overflow-y: scroll;
    .users {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
