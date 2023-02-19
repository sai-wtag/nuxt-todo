<template>
  <div class="todo-container">
    <TodoCardLoader v-if="isTodoLoading" class="loader" />

    <span class="todo__add-text">{{ $t('add-task') }}</span>
    <div class="todo__header">
      <button
        class="btn__create-task"
        :class="lightenClass"
        @click.prevent="setIsCreating"
      >
        <PlusIcon />
        <span>{{ $t('create') }}</span>
      </button>
      <FilterOptions />
    </div>

    <div class="card-container">
      <AddTodoCard v-if="isTodoCreating" class="card-item" />

      <!-- List of todos -->
      <template v-if="isTodoAvailable">
        <div v-for="todo in todos" :key="todo.id" class="card-item">
          <TodoItem :todo="todo" />
        </div>
      </template>
    </div>

    <TodoNotFound v-if="!isTodoFound" />

    <!-- Load more/less todos -->
    <TodoFooter />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FilterOptions from '@/components/todo/FilterOptions.vue'
import AddTodoCard from '@/components/todo/AddTodoCard.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoNotFound from '@/components/todo/utils/TodoNotFound.vue'
import TodoFooter from '@/components/todo/utils/TodoFooter.vue'
import TodoCardLoader from '@/components/todo/utils/TodoCardLoader.vue'
import PlusIcon from '@/icons/PlusIcon.vue'

export default {
  name: 'TodoContainer',
  components: {
    FilterOptions,
    AddTodoCard,
    TodoItem,
    TodoNotFound,
    TodoFooter,
    TodoCardLoader,
    PlusIcon,
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters('todos', [
      'isTodoCreating',
      'todos',
      'isTodoSearching',
      'isButtonDisabled',
      'isTodoListLoading',
      'isTodoAdding',
    ]),
    isTodoLoading() {
      return this.isTodoListLoading || this.isTodoSearching
    },
    isTodoAvailable() {
      return this.todos.length > 0
    },
    isTodoFound() {
      return this.isTodoAvailable || this.isTodoCreating
    },
    lightenClass() {
      return {
        lighten: this.isTodoAdding,
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('todos/fetchAllTodos')
  },
  methods: {
    onAddTodo(todo) {},
    setIsCreating() {
      if (this.isButtonDisabled) return
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
  position: relative;
  height: calc(100% - #{$header-height});
  @include padding(20px, $padding-breakpoints);
  @include flex(column, nowrap, flex-start);
  gap: 10px;
}
.todo__header {
  @include flex;
  width: 100%;
}
.card-container {
  @include grid(1, 20px, $grid-breakpoints);
  margin: 25px 0;
}

$card-padding: 15px;
.card-item {
  border: $border-1;
  border-radius: 5px;
  background-color: $bg-white;
  padding: $card-padding;
  height: 150px;
}

.todo-footer {
  @include flex(row, nowrap, center, center, 10px);
}

.btn__create-task {
  @include flex(row, nowrap, center, center, 5px);
  border: none;
  outline: none;
  background-color: #7a8dfd;
  color: $bg-white;
  width: 120px;
  height: $button-height;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.todo__add-text {
  margin: 25px 0;
  font-size: 30px;
  font-weight: 700;
  line-height: 35.16px;
  color: #32394b;
}

.lighten {
  opacity: 0.5;
}
</style>
