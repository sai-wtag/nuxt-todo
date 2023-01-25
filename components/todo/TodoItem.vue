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
      <div class="action-buttons">
        <div>
          <button
            v-if="!todo.completedAt"
            class="todo-action"
            @click.prevent="completeTodo"
          >
            {{ $t('complete') }}
          </button>
          <button v-if="!todo.completedAt" class="todo-action">
            {{ $t('edit') }}
          </button>
          <button class="todo-action" @click.prevent="deleteTodo">
            {{ $t('delete') }}
          </button>
        </div>
        <div>
          <span v-if="todo.completedAt" class="time">
            {{ $t('completed-in') }}:
            {{ formatDistance(todo.completedAt, new Date(), getTimeDistance) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format, formatDistance } from 'date-fns'
import { bn } from 'date-fns/locale'

export default {
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

  methods: {
    deleteTodo() {
      this.$store.dispatch('todos/delete', this.todo.id)
    },
    completeTodo() {
      this.$store.dispatch('todos/complete', this.todo.id)
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

.todo-title {
  font-size: 1.5rem;
}

.text-line-through {
  text-decoration: line-through;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
