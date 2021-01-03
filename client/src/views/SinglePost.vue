<template>
  <div class="single-post container" v-if="singlePost">
    <div class="single-post-card">
      <h2>{{ singlePost.user.name }}</h2>
      <h3>@{{ singlePost.user.username }}</h3>
      <p>{{ singlePost.content }}</p>
      <p>
        {{ singlePost.likes }}
        <i
          class="fas fa-heart"
          v-if="alreadyLiked"
          @click="removeLike(singlePost.id)"
        ></i>
        <i class="far fa-heart" v-else @click="likePost(singlePost.id)"></i>
      </p>
      <hr />
      <div class="single-post-card-footer">
        <h3>Users that likes this post</h3>
        <div v-for="like in singlePost.postLikes" :key="like.id" class="likes">
          <hr />
          <p>
            <strong>{{ like.name }}</strong>
          </p>
          <p>@{{ like.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const id = route.params.id;
    const alreadyLiked = ref(false);
    const singlePost = computed(() => {
      return store.getters.singlePost;
    });
    const user = computed(() => {
      return store.getters.user;
    });

    const getSinglePost = async () => {
      if (!user.value) {
        await store.dispatch('getOwnProfile');
      }

      await store.dispatch('getSinglePost', id);
    };

    getSinglePost();

    user.value.likedPosts.forEach((post) => {
      if (post.id == id) {
        alreadyLiked.value = true;
      }
    });

    const likePost = async (postId) => {
      await store.dispatch('likePost', postId);
      alreadyLiked.value = true;
      await store.dispatch('getSinglePost', id);
    };

    const removeLike = async(postId) => {
      alreadyLiked.value = false;
      await store.dispatch('removeLike', postId);
      await store.dispatch('getSinglePost', id);
    }

    return {
      singlePost,
      alreadyLiked,
      likePost,
      removeLike,
    };
  },
};
</script>

<style lang="scss" scoped>
.single-post {
  .single-post-card {
    width: 50vw;
    margin: auto;
    border-radius: 12px;
    background-color: $bg-color;
    box-shadow: $shadow;

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
