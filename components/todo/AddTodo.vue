<template>
  <div>
    <h2>Add Task</h2>
    <div class="add-todo__header">
      <button>Create</button>
      <FilterOptions />
    </div>
  </div>
</template>
<script>
import FilterOptions from './FilterOptions.vue'
export default {
  name: 'AddTodo',
  components: {
    FilterOptions,
  },
  data() {
    return {}
  },
}
</script>
<style scoped lang="scss">
.add-todo__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
