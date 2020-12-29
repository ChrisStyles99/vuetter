<template>
  <div class="user-profile container">
    <div class="profile-info">
      <h1>Profile</h1>
      <h2>{{profile.name}}</h2>
      <h3>@{{profile.username}}</h3>
      <h2>{{profile.email}}</h2>
    </div>
    <div class="profile-posts">
      <ProfilePost v-for="post in profile.posts" :key="post.id" :post="post" :user="{id: profile.id, name: profile.name, username: profile.username}"/>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import {useRoute} from 'vue-router';
import ProfilePost from '@/components/ProfilePost.vue';

export default {
  components: {
    ProfilePost
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const id = route.params.id;
    const profile = computed(() => {
      return store.getters.profile;
    });

    const getProfile = async() => {
      await store.dispatch('getProfiles', id);
    };

    getProfile();

    return {
      profile
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-profile {
    display: grid;
    grid-template-columns: 20% 2% 60% 18%;

    .profile-info {
      background-color: $bg-color;
      border-radius: 12px;
      box-shadow: $shadow;
      
      h1, h2, h3 {
        margin-left: 10px;
      }
    }

    .profile-posts {
      grid-column: 3 / 4;
    }
  }
</style>