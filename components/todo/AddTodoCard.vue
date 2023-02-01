<template>
  <div class="add-todo-card">
    <form @submit.prevent="submitHandler">
      <div class="add-todo-card__body">
        <input
          ref="titleInputRef"
          v-model="form.title"
          type="text"
          class="add-todo-card__input"
          :placeholder="titlePlaceholder"
          @focus="errorMessage = null"
        />
      </div>

      <div class="add-todo-card__footer">
        <button type="submit">
          {{ isTodoEditing ? $t('save') : $t('add') }}
        </button>
        <button
          v-if="isTodoEditing"
          type="button"
          @click.prevent="submitHandler($event, shouldComplete)"
        >
          {{ $t('complete') }}
        </button>
        <button @click.prevent="deleteCurrentTask">
          {{ isTodoEditing ? $t('cancel') : $t('delete') }}
        </button>
        <div>
          <span v-if="errorMessage" class="error-message">{{
            errorMessage
          }}</span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import toast from '@/utils/toast'

export default {
  name: 'AddTodoCard',

  props: {
    isTodoEditing: {
      type: Boolean,
      default: false,
    },
  },

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
      shouldComplete: true,
    }
  },

  computed: {
    ...mapGetters('todos', ['getEditableTodo', 'isTodoSearching']),
    titlePlaceholder() {
      const addTask = this.$t('add-task')
      const minWord = this.$t('min')
      const minValidation = this.validationRules.title.minLength

      const maxWord = this.$t('max')
      const maxValidation = this.validationRules.title.maxLength
      const characters = this.$t('characters')

      return `${addTask} (${minWord} ${minValidation} ${characters}, ${maxWord} ${maxValidation} ${characters})`
    },
  },
  mounted() {
    if (this.isTodoEditing) {
      this.form.title = this.getEditableTodo.title
    }
    this.$nextTick(() => {
      this.$refs.titleInputRef.focus()
    })
  },
  methods: {
    submitHandler(_, shouldCompleteTodo = false) {
      if (this.isTodoSearching) return

      const errorMessage = this.checkValidation()
      if (errorMessage) {
        this.errorMessage = errorMessage
        toast('error', this.$t('something-went-wrong'))
        return
      }

      if (shouldCompleteTodo) {
        this.completeAndUpdateTodo()
        return
      }
      this.isTodoEditing ? this.editTodo() : this.addTodo()
    },

    addTodo() {
      this.$emit('addTodo', this.form)
      this.form.title = ''
    },

    editTodo() {
      this.$store.dispatch('todos/update', {
        id: this.getEditableTodo.id,
        title: this.form.title,
      })
    },

    completeAndUpdateTodo() {
      this.$store.dispatch('todos/completeAndUpdate', {
        id: this.getEditableTodo.id,
        title: this.form.title,
      })
    },

    deleteCurrentTask() {
      if (this.isTodoSearching) return
      this.$store.dispatch('todos/deleteCurrentTask')
    },

    checkValidation() {
      const title = this.form.title.trim()
      const minTitleLength = this.validationRules.title.minLength
      const maxTitleLength = this.validationRules.title.maxLength

      if (!title) {
        return this.$t('validation.todo.title.required')
      }

      if (title.length < minTitleLength) {
        return this.$t('validation.todo.title.min-length', {
          minLength: minTitleLength,
        })
      }

      if (title.length > maxTitleLength) {
        return this.$t('validation.todo.title.max-length', {
          maxLength: maxTitleLength,
        })
      }
      return null
    },
  },
}
</script>

<style scoped lang="scss">
$card-padding: 10px;
$button-gap: 5px;
form {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: $button-gap;
}

.add-todo-card__footer {
  display: flex;
  align-items: center;
  width: 100%;
  gap: $button-gap;
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
