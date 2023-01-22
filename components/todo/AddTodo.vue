<template>
  <div class="add-todo">
    <h2>Add Task</h2>
    <div class="add-todo__header">
      <button>Create</button>
      <FilterOptions />
    </div>
    <div class="card-container">
      <AddTodoCard class="card-item" />
    </div>
  </div>
</template>
<script>
import FilterOptions from './FilterOptions.vue'
import AddTodoCard from './AddTodoCard.vue'
export default {
  name: 'AddTodo',
  components: {
    FilterOptions,
    AddTodoCard,
  },
  data() {
    return {}
  },
}
</script>
<style scoped lang="scss">
.add-todo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}
.add-todo__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-container {
  display: grid;
  gap: 50px 100px;
  grid-template-columns: auto auto auto;
}
</style>
