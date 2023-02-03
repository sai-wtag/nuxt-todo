<template>
  <div class="todo-container">
    <h2>{{ $t('add-task') }}</h2>
    <div class="todo__header">
      <button class="btn__create-task" @click.prevent="setIsCreating">
        <PlusIcon />
        <span>{{ $t('create') }}</span>
      </button>
      <span v-if="isTodoSearching">{{ $t('searching') }}</span>
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

import PlusIcon from '@/icons/PlusIcon.vue'

import toast from '@/utils/toast'

export default {
  name: 'TodoContainer',
  components: {
    FilterOptions,
    AddTodoCard,
    TodoItem,
    TodoFooter,
    PlusIcon,
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
      toast('success', this.$t('added', { item: this.$t('todo') }))
    },
    setIsCreating() {
      if (this.isTodoSearching) return
      this.$store.dispatch('todos/setIsCreating')
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/variables';
@import '@/assets/css/mixins';

$grid-breakpoints: (
  576px: 1,
  768px: 2,
  1200px: 3,
);
.todo-container {
  @include flex(column, nowrap, space-between);
  gap: 10px;
}
.todo__header {
  @include flex(row, nowrap, space-between);
}
.card-container {
  @include grid(1, 5px, $grid-breakpoints);
}

$card-padding: 15px;
.card-item {
  border: $border-1;
  border-radius: 5px;
  background-color: $bg-white;
  padding: $card-padding;
  height: 160px;
}

.todo-footer {
  @include flex(row, nowrap, center, center, 10px);
}

.todo__not-found {
  text-align: center;
  font-size: 20px;
}

.btn__create-task {
  @include flex(row, nowrap, center, center, 5px);
  border: none;
  outline: none;
  background-color: #7a8dfd;
  color: $bg-white;
  width: 120px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
</style>
