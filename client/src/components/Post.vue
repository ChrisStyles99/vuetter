<template>
  <div class="post">
    <div class="post-profile">
      <h3 v-if="user.id == post.user_id">{{ post.name }}</h3>
      <h3 v-if="user.id != post.user_id">
        <router-link class="user-link" :to="`/profiles/${post.user_id}`">{{
          post.name
        }}</router-link>
      </h3>
      <p>@{{ post.username }}</p>
    </div>
    <hr />
    <div class="post-content" @click="goToPost(post.id)">
      <p>{{ post.content }}</p>
    </div>
    <hr />
    <div class="post-likes">
      {{ post.likes }}
      <i
        class="fas fa-heart"
        @click="removeLike(post.id)"
        v-if="alreadyLiked"
      ></i>
      <i class="far fa-heart" @click="likePost(post.id)" v-else></i>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  props: ['post', 'user'],
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const alreadyLiked = ref(false);
    const user = computed(() => {
      return store.getters.user;
    });

    const getUser = async () => {
      if (!user.value) {
        await store.dispatch('getOwnProfile');
      }
    };

    getUser();

    const goToPost = (id) => {
      router.push(`/post/${id}`);
    };

    const userLikes = () => {
      user.value.likedPosts.forEach((like) => {
        if (like.id == props.post.id) {
          alreadyLiked.value = true;
        }
      });
    };
    userLikes();

    const likePost = async (id) => {
      await store.dispatch('likePost', id);
      alreadyLiked.value = true;
      store.getters.posts.forEach(post => {
        if(post.id == id) {
          post.likes++;
        }
      });
      store.getters.user.posts.forEach(post => {
        if(post.id == id) {
          post.likes++;
        }
      });
    };

    const removeLike = async(id) => {
      alreadyLiked.value = false;
      await store.dispatch('removeLike', id);
      store.getters.posts.forEach(post => {
        if(post.id == id) {
          post.likes--;
        }
      });
      store.getters.user.posts.forEach(post => {
        if(post.id == id) {
          post.likes--;
        }
      });
    }

    return {
      goToPost,
      alreadyLiked,
      likePost, removeLike
    };
  },
};
</script>

<style lang="scss" scoped>
.post {
  border: 1px solid $secondary;
  background-color: $bg-color;
  border-radius: 12px;
  margin: 2px 0;
  box-shadow: $shadow;

  .post-profile {
    margin-left: 10px;

    h3 {
      .user-link {
        text-decoration: none;
        color: $third;
      }
    }
    p {
      margin-top: -15px;
    }
  }

  .post-content {
    margin-left: 10px;
    cursor: pointer;
  }

  .post-likes {
    margin-left: 10px;
    margin-bottom: 5px;

    i.fas.fa-heart {
      color: $heart-color;
      cursor: pointer;
    }

    i.far.fa-heart {
      color: $heart-color;
      cursor: pointer;
    }
  }
}
</style>
