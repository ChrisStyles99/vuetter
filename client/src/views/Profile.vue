<template>
  <div class="profile container">
    <div class="profile-info">
      <h1>Profile</h1>
      <h2>{{user.name}}</h2>
      <h3>@{{user.username}}</h3>
      <h2>{{user.email}}</h2>
      <button @click="modal = true">Following</button>
    </div>
    <div class="profile-posts">
      <ProfilePost v-for="post in user.posts" :key="post.id" :post="post" :user="{id: user.id, name: user.name, username: user.username}"/>
    </div>
    <teleport to="body">
      <FollowingModal v-if="modal" :users="user.friends" @hide-modal="hideModal" />
      <div v-if="modal" class="overlay"></div>
    </teleport>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ProfilePost from '@/components/ProfilePost.vue';
import FollowingModal from '@/components/FollowingModal.vue';

export default {
  components: {
    ProfilePost,
    FollowingModal
  },
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.getters.user;
    });
    const modal = ref(false);
    
    const getProfile = async() => {
      if(!user.value) {
        await store.dispatch('getOwnProfile');
      }
    };

    getProfile();

    const hideModal = () => {
      modal.value = false;
    };

    return {
      user, modal, hideModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    display: grid;
    grid-template-columns: 20% 2% 60% 18%;
    grid-template-rows: auto;

    .profile-info {
      background-color: $bg-color;
      border-radius: 12px;
      box-shadow: $shadow;
      max-height: 40vh;
      
      h1, h2, h3, button {
        margin-left: 10px;
      }

      button {
        border: 2px solid $third;
        background: none;
        border-radius: 12px;
        padding: 10px 15px;
        font-size: 1.2rem;
        color: $third;
        cursor: pointer;
        transition: 0.3s ease all;

        &:hover {
          background-color: $third;
          color: $dark-text;
        }
      }
    }

    .profile-posts {
      grid-column: 3 / 4;
      overflow-y: scroll;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
  }
</style>