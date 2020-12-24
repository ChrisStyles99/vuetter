<template>
  <nav class="navbar">
    <div class="container">
      <h1 class="logo">
        <router-link class="home-link" to="/">Vuetter</router-link>
      </h1>
      <div class="profile">
        <input type="text" />
        <router-link class="profile-link" to="/profile">Profile name</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
.navbar {
  height: 80px;
  background-color: $primary;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    width: 80vw;
    margin: auto;

    .logo {
      .home-link {
        text-decoration: none;
        font-size: 2.5rem;
        color: $dark-text;
      }
    }

    .profile {

      align-items: center;

      input {
        border-radius: 12px;
        border: none;
        padding: 10px;
        margin-right: 10px;
      }

      .profile-link {
        text-decoration: none;
        font-size: 1.5rem;
        color: $dark-text;
        margin-left: 10px;
      }
    }
  }
}
</style>
