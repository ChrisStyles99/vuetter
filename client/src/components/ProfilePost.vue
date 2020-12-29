<template>
  <div class="profile-post">
    <div class="post-profile">
      <h3>{{user.name}}</h3>
      <p>@{{user.username}}</p>
    </div>
    <div class="post-content">
      <p>{{post.content}}</p>
    </div>
    <div class="post-likes">
      {{post.likes}} <i class="fas fa-heart"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post', 'user']
}
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
    }
  }
</style>