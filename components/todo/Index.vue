<template>
  <div class="container">
    <TodoHeader />
    <TodoContainer />
  </div>
</template>
<script>
import TodoHeader from '@/components/todo/Header.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'

export default {
  name: 'TodoIndex',
  components: {
    TodoHeader,
    TodoContainer,
  },
  data() {
    return {}
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

.container {
  height: 100vh;
}
</style>
