<template>
  <div class="add-post">
    <form @submit.prevent="addPost">
      <textarea rows="5" placeholder="What's up today?" v-model="content"></textarea>
      <button type="submit">Add post!</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();

    const content = ref('');

    const addPost = async() => {
      if(content.value === '') {
        return
      }

      const data = {
        content: content.value
      }

      await store.dispatch('addPost', data);

      content.value = '';
    };

    return {
      content, addPost
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-post {
    form {
      position: relative;
      width: 99%;

      textarea {
        width: inherit;
        font-size: 1.2rem;
        font-family: 'Fira Sans Condensed', sans-serif;
        resize: none;
        padding: 10px;
        outline: none;
      }    

      button {
        position: absolute;
        right: 20px;
        bottom: 10px;
        padding: 10px 15px;
        border-radius: 12px;
        border: none;
        background-color: $third;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease all;

        &:hover {
          background-color: $secondary;
          color: $dark-text;
        }
      }
    }
  }
</style>