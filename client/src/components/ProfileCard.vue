<template>
  <div class="profile-card">
    <h2 v-if="user == profile.id">{{profile.name}}</h2>
    <h2 v-else><router-link class="user-profile" :to="`/profiles/${profile.id}`">{{profile.name}}</router-link></h2>
    <h3>@{{profile.username}}</h3>
  </div>
</template>

<script>
export default {
  props: ['profile', 'user']
}
</script>

<style lang="scss" scoped>
  .profile-card {
    background-color: $bg-color;
    box-shadow: $shadow;
    margin-right: 10px;
    padding: 10px 15px;
    border-radius: 12px;

    .user-profile {
      text-decoration: none;
      color: $third;
    }
  }
</style>