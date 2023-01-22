<template>
  <div class="container">
    <header class="header">
      <h1>Todos</h1>
      <SearchBar />
    </header>
    <AddTodo />
  </div>
</template>
<script>
import SearchBar from './SearchBar.vue'
import AddTodo from './AddTodo.vue'

export default {
  name: 'TodoIndex',
  components: {
    SearchBar,
    AddTodo,
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
