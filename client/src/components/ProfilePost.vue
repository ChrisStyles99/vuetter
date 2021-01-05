<template>
  <div class="profile-post">
    <div class="post-profile">
      <h3>{{ user.name }} <span style="color: #999;"><small> | {{date}}</small></span></h3>
      <p>@{{ user.username }}</p>
    </div>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="post-likes">
      <div class="likes">
        {{ post.likes }}
        <i class="fas fa-heart" v-if="alreadyLiked" @click="removeLike(post.id)"></i>
        <i class="far fa-heart" v-else @click="likePost(post.id)"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
export default {
  props: ['post', 'user'],
  setup(props) {
    const store = useStore();
    const alreadyLiked = ref(false);

    const date = computed(() => {
      return moment(props.post.createdAt).fromNow();
    });

    props.user.likes.forEach((like) => {
      if (like.id == props.post.id) {
        return (alreadyLiked.value = true);
      }
    });

    const likePost = async (id) => {
      await store.dispatch('likePost', id);
      alreadyLiked.value = true;
      store.getters.posts.forEach((post) => {
        if (post.id == id) {
          post.likes++;
        }
      });
      console.log(store.getters.user);
      store.getters.user.posts.forEach((post) => {
        if (post.id == id) {
          post.likes++;
        }
      });
    };

    const removeLike = async (id) => {
      alreadyLiked.value = false;
      await store.dispatch('removeLike', id);
      store.getters.posts.forEach((post) => {
        if (post.id == id) {
          post.likes--;
        }
      });
      console.log(store.getters.user);
      store.getters.user.posts.forEach((post) => {
        if (post.id == id) {
          post.likes--;
        }
      });
    };

    return {
      alreadyLiked, likePost, removeLike, date
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-post {
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
  }

  .post-likes {
    margin-left: 10px;
    margin-bottom: 5px;

    i {
      color: $heart-color;
      cursor: pointer;
    }
  }
}
</style>
