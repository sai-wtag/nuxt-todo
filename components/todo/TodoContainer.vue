<template>
  <div class="todo-container">
    <h2>{{ $t('add-task') }}</h2>
    <div class="todo__header">
      <button @click.prevent="setIsCreating">{{ $t('create') }}</button>
      <div>
        <span v-if="isTodoSearching">{{ $t('searching') }}</span>
      </div>
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
    </div>

    <!-- No todos found -->
    <div v-if="!isTodoFound" class="todo__not-found">
      {{ $t('not-found', { item: $t('todos') }) }}
    </div>

    <!-- Load more/less todos -->
    <TodoFooter />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FilterOptions from '@/components/todo/FilterOptions.vue'
import AddTodoCard from '@/components/todo/AddTodoCard.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoFooter from '@/components/todo/utils/TodoFooter.vue'

export default {
  name: 'TodoContainer',
  components: {
    FilterOptions,
    AddTodoCard,
    TodoItem,
    TodoFooter,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('todos', ['isTodoCreating', 'todos', 'isTodoSearching']),
    isTodoAvailable() {
      return this.todos.length > 0
    },
    isTodoFound() {
      return this.isTodoAvailable || this.isTodoCreating
    },
  },
  methods: {
    onAddTodo(todo) {
      this.$store.dispatch('todos/add', todo)
    },
    setIsCreating() {
      if (this.isTodoSearching) return
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

.todo-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.todo__not-found {
  text-align: center;
  font-size: 20px;
}
</style>
