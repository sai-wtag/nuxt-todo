<template>
  <div class="add-todo-card">
    <TodoCardLoader
      v-if="isTodoCreatingOrUpdating"
      :is-main-loader="true"
      icon-width="64"
      icon-height="64"
    />
    <form @submit.prevent="submitHandler">
      <div class="add-todo-card__body">
        <textarea
          ref="titleInputRef"
          v-model="form.title"
          type="text"
          class="add-todo-card__input"
          :placeholder="titlePlaceholder"
          @focus="errorMessage = null"
        />
      </div>

      <div class="add-todo-card__footer">
        <button class="btn__save" type="submit">
          {{ isTodoEditing ? $t('save') : $t('add') }}
        </button>
        <div
          v-if="isTodoEditing"
          :title="$t('complete')"
          @click.prevent="submitHandler($event, shouldComplete)"
        >
          <CompleteIcon />
        </div>
        <div :title="$t('delete')" @click.prevent="deleteCurrentTask">
          <DeleteIcon />
        </div>
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
import { SUCCESS, ERROR } from '@/utils/constants'

import CompleteIcon from '@/icons/CompleteIcon'
import DeleteIcon from '@/icons/DeleteIcon'
import TodoCardLoader from '@/components/todo/utils/TodoCardLoader.vue'

export default {
  name: 'AddTodoCard',
  components: {
    CompleteIcon,
    DeleteIcon,
    TodoCardLoader,
  },
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
    ...mapGetters('todos', [
      'getEditableTodo',
      'isButtonDisabled',
      'isTodoLoading',
      'isTodoAdding',
      'isTodoUpdating',
    ]),
    isTodoCreatingOrUpdating() {
      if (this.isTodoEditing) {
        return this.isTodoUpdating
      }
      return this.isTodoAdding
    },
    titlePlaceholder() {
      const addTask = this.$t('add-task')
      const minWord = this.$t('min')
      const minValidation = this.validationRules.title.minLength

      const maxWord = this.$t('max')
      const maxValidation = this.validationRules.title.maxLength
      const characters = this.$t('characters')

      return `${addTask} (${minWord} ${minValidation}, ${maxWord} ${maxValidation} ${characters})`
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
      if (this.isButtonDisabled) return
      const errorMessage = this.checkValidation()
      if (errorMessage) {
        this.errorMessage = errorMessage
        toast(ERROR, this.$t(this.errorMessage))
        return
      }

      if (shouldCompleteTodo) {
        this.completeAndUpdateTodo()
        return
      }
      this.isTodoEditing ? this.editTodo() : this.addTodo()
    },

    async addTodo() {
      const { success } = await this.$store.dispatch('todos/add', this.form)
      this.form.title = ''
      const item = this.$t('todo')
      if (success) {
        return toast(SUCCESS, this.$t('added', { item }))
      }
      return toast(ERROR, this.$t('something-went-wrong'))
    },

    async editTodo() {
      const { success } = await this.$store.dispatch('todos/update', {
        id: this.getEditableTodo.id,
        title: this.form.title,
      })
      if (success) {
        return toast(SUCCESS, this.$t('updated', { item: this.$t('todo') }))
      }
      return toast(ERROR, this.$t('something-went-wrong'))
    },

    async completeAndUpdateTodo() {
      const { success } = await this.$store.dispatch(
        'todos/completeAndUpdate',
        {
          id: this.getEditableTodo.id,
          title: this.form.title,
        }
      )
      if (success) {
        return toast(SUCCESS, this.$t('completed', { item: this.$t('todo') }))
      }
      return toast(ERROR, this.$t('something-went-wrong'))
    },

    deleteCurrentTask() {
      if (this.isButtonDisabled) return
      this.$store.dispatch('todos/deleteCurrentTask', this.isTodoEditing)
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
@import '@/assets/css/variables';
@import '@/assets/css/mixins';

$card-padding: 10px;
$button-gap: 15px;
.add-todo-card {
  position: relative;
  height: 100%;
}
form {
  width: 100%;
  height: 100%;
  @include flex(column, nowrap, space-between, stretch, 0);
}

.add-todo-card__footer {
  @include flex(row, nowrap, flex-start, center, $button-gap);
  width: 100%;
}
.add-todo-card__input {
  border: 3px solid #d4d9f7;
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  color: #32394b;
  width: calc(100% - $card-padding);
  height: 80px;
  &:focus {
    border: 3px solid #d1d8ff;
  }
}

.btn__save {
  cursor: pointer;
  border: $border-1;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: $bg-white;
  font-size: 16px;
  font-weight: 500;
  color: #32394b;
  height: 36px;
}

.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
