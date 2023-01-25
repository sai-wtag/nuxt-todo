<template>
  <div class="action-buttons">
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
</template>
<script>
export default {
  name: 'TodoActions',
  props: {
    todo: {
      type: Object,
      required: true,
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
.action-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
