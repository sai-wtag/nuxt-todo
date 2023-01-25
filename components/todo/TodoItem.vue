<template>
  <div class="todo-item">
    <div class="todo-item__header">
      <span
        class="todo-title"
        :class="todo.completedAt ? 'text-line-through' : ''"
        >{{ todo.title }}</span
      >
      <span class="time"
        >{{ $t('created-at') }}:
        {{ format(todo.createdAt, 'yyyy-MMM-dd') }}
      </span>
    </div>

    <div class="todo-item__footer">
      <TodoActions :todo="todo" />
      <div>
        <span v-if="todo.completedAt" class="time">
          {{ $t('completed-in') }}:
          {{ formatDistance(todo.completedAt, new Date(), getTimeDistance) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { format, formatDistance } from 'date-fns'
import { bn } from 'date-fns/locale'

import TodoActions from '@/components/todo/utils/TodoActions.vue'

export default {
  components: {
    TodoActions,
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
    getTimeDistance() {
      const distance = {
        addSuffix: true,
      }

      if (this.$i18n.locale === 'bn') {
        distance.locale = bn
      }

      return distance
    },
  },
}
</script>
<style scoped lang="scss">
.time {
  font-size: 0.8rem;
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
  font-size: 1.5rem;
}

.text-line-through {
  text-decoration: line-through;
}
</style>
