<template>
  <div class="todo-item">
    <div class="todo-title">{{ todo.title }}</div>
    <div>
      <div class="created-at">
        Created at:
        {{ $moment(todo.createdAt).format('MMMM Do YYYY') }}
      </div>
      <div>
        <button class="todo-action">Complete</button>
        <button class="todo-action">Edit</button>
        <button class="todo-action" @click.prevent="deleteTodo">Delete</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    deleteTodo() {
      this.$store.dispatch('todos/delete', this.todo.id)
    },
  },
}
</script>
<style scoped lang="scss">
.todo-title {
  font-size: 1.5rem;
}
.created-at {
  font-size: 0.8rem;
}

.todo-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
