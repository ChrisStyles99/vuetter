<template>
  <div class="user-profile container">
    <div v-if="error" class="error">
      <h1>There's no profile with that id</h1>
      <router-link class="go-back" to="/">Go back</router-link>
    </div>
    <div v-if="!error" class="profile-info">
      <h1>Profile</h1>
      <h2>{{ profile.name }}</h2>
      <h3>@{{ profile.username }}</h3>
      <h2>{{ profile.email }}</h2>
      <button class="follow-btn" v-if="!alreadyFriend" @click="follow">Follow</button>
      <button class="unfollow-btn" v-if="alreadyFriend" @click="unfollow">Unfollow</button>
      <button class="modal-btn" @click="modal = true">Following</button>
    </div>
    <div v-if="!error" class="profile-posts">
      <ProfilePost
        v-for="post in profile.posts"
        :key="post.id"
        :post="post"
        :user="{
          id: profile.id,
          name: profile.name,
          username: profile.username,
          likes: user.likedPosts
        }"
      />
    </div>
    <teleport v-if="!error" to="#app">
      <FollowingModal
        v-if="modal"
        :users="profile.friends"
        @hide-modal="hideModal"
        :profileId="user.id"
        :following="following"
      />
      <div v-if="modal" class="overlay"></div>
    </teleport>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ProfilePost from '@/components/ProfilePost.vue';
import FollowingModal from '@/components/FollowingModal.vue';

export default {
  components: {
    ProfilePost,
    FollowingModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const id = route.params.id;
    const alreadyFriend = ref(false);
    const modal = ref(false);
    const profile = computed(() => {
      return store.getters.profile;
    });
    const user = computed(() => {
      return store.getters.user;
    });
    const following = computed(() => {
      return store.getters.profileFollowingCount;
    });
    const error = computed(() => {
      return store.getters.getProfilesError;
    });

    const getProfile = async () => {
      if (!user.value) {
        await store.dispatch('getOwnProfile');
      }

      if (user.value.id == id) {
        return router.push('/profile');
      }

      await store.dispatch('getProfiles', id);
    };

    getProfile();

    if(user.value.friends != null) {
      user.value.friends.forEach((friend) => {
      if (friend.id == id) {
        alreadyFriend.value = true;
      }
    });
    }

    const follow = async () => {
      await store.dispatch('followUser', id);
      alreadyFriend.value = true;
    };

    const unfollow = async () => {
      await store.dispatch('unfollowUser', id);
      alreadyFriend.value = false;
    };

    const hideModal = () => {
      modal.value = false;
    };

    return {
      profile,
      alreadyFriend,
      follow,
      unfollow,
      modal,
      hideModal,
      user,
      following,
      error
    };
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 20% 2% 60% 18%;
  margin-top: 10px;

  .error {
    background-color: $bg-color;
    border-radius: 12px;
    box-shadow: $shadow;
    margin: 0 auto;
    grid-column: 3 / 4;
    padding: 10px 15px;

    .go-back {
      text-decoration: none;
      color: $third;
      font-size: 1.2rem;
    }
  }

  .profile-info {
    background-color: $bg-color;
    border-radius: 12px;
    box-shadow: $shadow;
    max-height: 300px;

    h1,
    h2,
    h3,
    button {
      margin-left: 10px;
    }

    .follow-btn {
      background-color: $primary;
      font-size: 1.2rem;
      padding: 10px 15px;
      border-radius: 12px;
      cursor: pointer;
      color: $dark-text;
      border: 3px solid $primary;
    }

    .unfollow-btn {
      background-color: $error-text;
      font-size: 1.2rem;
      padding: 10px 15px;
      border-radius: 12px;
      cursor: pointer;
      color: $dark-text;
      border: 3px solid $error-text;
    }

    .modal-btn {
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

    h2 {
      color: $dark-text;
    }
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
