<template>
  <div class="single-post container" v-if="singlePost">
    <div class="single-post-card">
      <h2>{{singlePost.user.name}}</h2>
      <h3>@{{singlePost.user.username}}</h3>
      <p>{{singlePost.content}}</p>
      <p>{{postLikes}} <span><i class="fas fa-heart"></i></span> </p>
      <hr>
      <div class="single-post-card-footer">
        <h3>Users that likes this post</h3>
        <div v-for="like in singlePost.postLikes" :key="like.id" class="likes">
          <hr>
          <p>{{like.name}}</p>
          <p>@{{like.username}}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const id = route.params.id;
    const alreadyLike = ref(false);
    const singlePost = computed(() => {
      return store.getters.singlePost;
    });
    const user = computed(() => {
      return store.getters.user;
    });

    const getSinglePost = async() => {
      if(!user.value) {
        await store.dispatch('getOwnProfile');
      }

      await store.dispatch('getSinglePost', id);
    }

    getSinglePost();

    const postLikes = computed(() => {
      return singlePost.value.postLikes.length;
    });

    user.value.likedPosts.forEach(post => {
      if(post.id == id) {
        alreadyLike.value = true;
      }
    });

    return {
      singlePost, postLikes
    }
  }
}
</script>

<style lang="scss" scoped>
  .single-post {
    .single-post-card {
      width: 50vw;
      margin: auto;
      border-radius: 12px;
      background-color: $bg-color;
      box-shadow: $shadow;
    }
  }
</style>