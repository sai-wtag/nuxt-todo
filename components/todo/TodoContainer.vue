<template>
  <div class="todo-container">
    <h2>{{ $t('add-task') }}</h2>
    <div class="todo__header">
      <button @click.prevent="setIsCreating">{{ $t('create') }}</button>
      <FilterOptions />
    </div>

    <div class="card-container">
      <AddTodoCard
        v-if="isTodoCreating"
        class="card-item"
        @addTodo="onAddTodo"
      />

      <!-- List of todos -->
      <template v-if="isTodoAvailable">
        <div v-for="todo in todos" :key="todo.id" class="card-item">
          <TodoItem :todo="todo" />
        </div>
      </template>
      <template v-else>
        <div>{{ $t('not-found', { item: $t('todos') }) }}</div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FilterOptions from '@/components/todo/FilterOptions.vue'
import AddTodoCard from '@/components/todo/AddTodoCard.vue'
import TodoItem from '@/components/todo/TodoItem.vue'

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
    isTodoAvailable() {
      return this.todos.length > 0
    },
  },
  methods: {
    onAddTodo(todo) {
      this.$store.dispatch('todos/add', todo)
    },
    setIsCreating() {
      this.$store.dispatch('todos/setIsCreating')
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
  gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

$card-padding: 10px;
.card-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: $card-padding;
  height: 100px;
}
</style>
