<template>
  <SplashScreen v-if="isTodoListLoading" />
  <div v-else class="container">
    <TodoHeader />
    <TodoContainer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TodoHeader from '@/components/todo/Header.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'
import SplashScreen from '@/components/todo/utils/SplashScreen.vue'

export default {
  name: 'TodoIndex',
  components: {
    TodoHeader,
    TodoContainer,
    SplashScreen,
  },
  computed: {
    ...mapGetters('todos', ['isTodoListLoading']),
  },
  beforeCreate() {
    this.$store.dispatch('todos/fetchAllTodos')
  },
}
</script>
<style lang="scss">
@import '@/assets/css/variables';

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: $bg-primary;
  font-family: $font-family;
  min-height: 100vh;
}

svg {
  cursor: pointer;
}

select {
  width: 180px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e5e5e5;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 19.69px;
  color: #32394b;
  background-color: #fff;
  cursor: pointer;
}

.container {
  height: 100vh;
}
</style>
