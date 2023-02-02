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
body {
  margin: 0;
  padding: 0 100px;
  background-color: $bg-primary;
  font-family: $font-family;
  min-height: 100vh;
}
</style>
