<template>
  <div class="action-buttons">
    <div v-if="!isTodoCompleted" class="btn__not-completed">
      <span :title="$t('complete')" @click.prevent="completeTodo">
        <CompleteIcon />
      </span>
      <span :title="$t('edit')" @click.prevent="editTodo">
        <EditIcon />
      </span>
    </div>
    <span :title="$t('delete')" @click.prevent="deleteTodo">
      <DeleteIcon />
    </span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import toast from '@/utils/toast'

import CompleteIcon from '@/icons/CompleteIcon'
import EditIcon from '@/icons/EditIcon'
import DeleteIcon from '@/icons/DeleteIcon'

export default {
  name: 'TodoActions',
  components: {
    CompleteIcon,
    EditIcon,
    DeleteIcon,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters('todos', ['isButtonDisabled']),
    isTodoCompleted() {
      return !!this.todo.completedAt
    },
  },

  methods: {
    async deleteTodo() {
      if (this.isButtonDisabled) return
      const { success } = await this.$store.dispatch(
        'todos/delete',
        this.todo.id
      )
      if (success) {
        return toast('success', this.$t('deleted', { item: this.$t('todo') }))
      }
      return toast('error', this.$t('something-went-wrong'))
    },

    async completeTodo() {
      if (this.isButtonDisabled) return
      const { success } = await this.$store.dispatch(
        'todos/complete',
        this.todo.id
      )
      if (success) {
        return toast('success', this.$t('completed', { item: this.$t('todo') }))
      }
      return toast('error', this.$t('something-went-wrong'))
    },

    editTodo() {
      if (this.isButtonDisabled) return
      this.$store.dispatch('todos/setEditableTodo', this.todo.id)
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/mixins';

$button-gap: 20px;
.action-buttons {
  @include flex(row, nowrap, flex-start, center, $button-gap);
}

.btn__not-completed {
  @extend .action-buttons;
}
</style>
