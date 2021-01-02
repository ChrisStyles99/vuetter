<template>
  <div class="post">
    <div class="post-profile">
      <h3 v-if="user.id == post.user_id">{{post.name}}</h3>
      <h3 v-if="user.id != post.user_id"><router-link class="user-link" :to="`/profiles/${post.user_id}`">{{post.name}}</router-link></h3>
      <p>@{{post.username}}</p>
    </div>
    <div class="post-content" @click="goToPost(post.id)">
      <p>{{post.content}}</p>
    </div>
    <div class="post-likes" @click="goToPost(post.id)">
      {{post.likes}} <i class="fas fa-heart"></i><i class="far fa-heart"></i>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: ['post', 'user'],
  setup() {
    const router = useRouter();

    const goToPost = id => {
      router.push(`/post/${id}`);
    }

    return {
      goToPost
    }
  }
}
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
      cursor: pointer;
    }
  }
</style>