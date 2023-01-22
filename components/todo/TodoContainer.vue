<template>
  <div class="todo-container">
    <h2>Add Task</h2>
    <div class="todo__header">
      <button @click.prevent="$store.commit('todos/setCreate')">Create</button>
      <FilterOptions />
    </div>

    <div class="card-container">
      <!-- Add todo card -->
      <AddTodoCard
        v-if="isTodoCreating"
        class="card-item"
        @addTodo="onAddTodo"
      />

      <!-- List of todos -->
      <template v-if="todos.length">
        <div v-for="todo in todos" :key="todo.id" class="card-item">
          <TodoItem :todo="todo" />
        </div>
      </template>
      <template v-else>
        <div>No todos found</div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FilterOptions from './FilterOptions.vue'
import AddTodoCard from './AddTodoCard.vue'
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoContainer',
  components: {
    FilterOptions,
    AddTodoCard,
    TodoItem,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('todos', ['isTodoCreating', 'todos']),
  },
  methods: {
    onAddTodo(todo) {
      this.$store.dispatch('todos/add', todo)
    },
  },
}
</script>
<style scoped lang="scss">
.todo-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}
.todo__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-container {
  display: grid;
  gap: 50px 100px;
  grid-template-columns: auto auto auto;
}

$card-padding: 10px;
.card-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: $card-padding;
  height: 100px;
}
</style>
