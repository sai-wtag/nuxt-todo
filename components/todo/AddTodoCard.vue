<template>
  <div class="add-todo-card">
    <form @submit.prevent="addTodo">
      <div class="add-todo-card__body">
        <input
          v-model="form.title"
          type="text"
          class="add-todo-card__input"
          :placeholder="`${$t('add-task')} (${$t('min')} ${
            validationRules.title.minLength
          }, ${$t('max')} ${validationRules.title.maxLength} characters)`"
        />
      </div>

      <div class="add-todo-card__footer">
        <button type="submit" class="add-todo-card__footer__btn">
          {{ $t('add') }}
        </button>
        <button @click.prevent="deleteCurrentTask">{{ $t('delete') }}</button>
        <span v-if="errorMessage" class="error-message">{{
          errorMessage
        }}</span>
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
      errorMessage: null,
      validationRules: {
        title: {
          required: true,
          minLength: 5,
          maxLength: 50,
        },
      },
    }
  },
  methods: {
    addTodo() {
      const errorMessage = this.checkValidation()
      if (errorMessage) {
        this.errorMessage = errorMessage
        return
      }
      this.$emit('addTodo', this.form)
      this.form.title = ''
    },

    deleteCurrentTask() {
      this.$store.dispatch('todos/deleteCurrentTask')
    },

    checkValidation() {
      const title = this.form.title.trim()
      const minTitleLength = this.validationRules.title.minLength
      const maxTitleLength = this.validationRules.title.maxLength

      if (!title) {
        return 'Please enter a title'
      }

      if (title.length < minTitleLength) {
        return `Title should be more than ${minTitleLength} characters`
      }

      if (title.length > maxTitleLength) {
        return `Title should be less than ${maxTitleLength} characters`
      }
      return null
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
  gap: $card-padding $card-padding;
}

.add-todo-card__input {
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  width: calc(100% - $card-padding);
  height: 70px;
}

.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
