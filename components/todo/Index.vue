<template>
  <div class="container">
    <header class="header">
      <h1>Todos</h1>
      <SearchBar />
    </header>
    <TodoContainer />
  </div>
</template>
<script>
import SearchBar from '@/components/todo/SearchBar.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'

export default {
  name: 'TodoIndex',
  components: {
    SearchBar,
    TodoContainer,
  },
  data() {
    return {}
  },
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  margin: 0 auto;
  padding: 0 100px;
}
</style>
