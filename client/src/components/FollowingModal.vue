<template>
  <div class="following">
    <h1>Following - {{users.length}}</h1>
    <i class="fas fa-times" @click="hideModal"></i>
    <div v-for="user in users" :key="user.id" class="card">
      <h1 v-if="profileId === user.id">{{user.name}}</h1>
      <h1 v-else><router-link class="profile-link" :to="`/profiles/${user.id}`">{{user.name}}</router-link></h1>
      <h2>@{{user.username}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['users', 'profileId'],
  setup(_, {emit}) {
    const hideModal = () => {
      emit('hide-modal');
    };

    return {
      hideModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .following {
    background-color: $bg-color;
    box-shadow: $shadow;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    z-index: 100;
    border-radius: 12px;
    padding: 10px;

    i {
      font-size: 1.5rem;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    .card {
      border: 3px solid $secondary;
      padding: 10px 15px;
      border-radius: 12px;

      .profile-link {
        text-decoration: none;
        color: $third;
      }
    }
  }
</style>