<template>
  <div v-if="!isTodoEditing" class="todo-item">
    <div class="todo-item__header">
      <span
        class="todo-title"
        :class="todo.isTodoCompleted ? 'text-line-through' : ''"
        >{{ todo.title }}</span
      >
      <span class="time"
        >{{ $t('created-at') }}:
        {{ format(todo.createdAt, 'dd-MMM-yyyy') }}
      </span>
    </div>

    <div class="todo-item__footer">
      <TodoActions :todo="todo" />
      <div>
        <button v-if="todo.isTodoCompleted" class="btn__completed-in">
          {{ $t('completed-in') }}:
          {{ getCompletedInTime }}
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <AddTodoCard :todo="todo" :is-todo-editing="true" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { format, formatDistance } from 'date-fns'
import { bn } from 'date-fns/locale'

import TodoActions from '@/components/todo/utils/TodoActions.vue'
import AddTodoCard from '@/components/todo/AddTodoCard.vue'

export default {
  components: {
    TodoActions,
    AddTodoCard,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  setup() {
    return {
      format,
      formatDistance,
      bn,
    }
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters('todos', ['getEditableTodo']),
    isTodoEditing() {
      return this.getEditableTodo
        ? this.getEditableTodo.id === this.todo.id
        : false
    },
    getLocale() {
      let locale = {}
      if (this.$i18n.locale === 'bn') {
        locale = { locale: bn }
      }
      return locale
    },
    getCompletedInTime() {
      return formatDistance(
        this.todo.createdAt,
        this.todo.completedAt,
        this.getLocale
      )
    },
  },
}
</script>
<style scoped lang="scss">
.time {
  font-size: 14px;
  font-weight: 700;
  line-height: 16.41px;
  color: #bbbdd0;
}

.todo-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.todo-item__header {
  display: flex;
  flex-direction: column;
}

.todo-item__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-title {
  color: #32394b;
  font-size: 24px;
  font-weight: 700;
  line-height: 28.13px;
}
.text-line-through {
  color: #0bc375;
  text-decoration: line-through;
}

.btn__completed-in {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  height: 24px;
  background-color: #7a8dfd;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  line-height: 14.06px;
}
</style>
