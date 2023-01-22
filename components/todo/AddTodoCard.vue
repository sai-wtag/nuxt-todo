<template>
  <div class="add-todo-card">
    <form @submit.prevent="addTodo">
      <div class="add-todo-card__body">
        <!-- <textarea
            v-model="form.title"
            class="add-todo-card__input"
            placeholder="Add Task"
          /> -->
        <input
          v-model="form.title"
          type="text"
          class="add-todo-card__input"
          placeholder="Add Task"
        />
      </div>
      <div class="add-todo-card__footer">
        <button type="submit" class="add-todo-card__footer__btn">
          Add Task
        </button>
        <button>Delete</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'AddTodoCard',
  data() {
    return {
      form: {
        title: '',
      },
    }
  },
  methods: {
    addTodo() {
      this.$emit('addTodo', this.form)
      this.form.title = ''
    },
  },
}
</script>

<style scoped lang="scss">
$card-padding: 10px;

form {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 5px;
}
.add-todo-card__footer {
  display: flex;
  align-items: center;
  gap: 10px 10px;
}

.add-todo-card__input {
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  width: calc(100% - $card-padding);
  height: 70px;
}
</style>
