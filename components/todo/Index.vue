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
@import '@/assets/css/mixins';

.header {
  @include flex(row, nowrap, space-between, center);
}

.container {
  margin: 0 auto;
  padding: 0 100px;
  font-family: $font-family;
}
</style>
