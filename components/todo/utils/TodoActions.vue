<template>
  <div class="action-buttons">
    <div v-if="!todo.isTodoCompleted">
      <button @click.prevent="completeTodo">
        {{ $t('complete') }}
      </button>
      <button @click.prevent="editTodo">
        {{ $t('edit') }}
      </button>
    </div>

    <button @click.prevent="deleteTodo">
      {{ $t('delete') }}
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import toast from '@/utils/toast'

export default {
  name: 'TodoActions',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('todos', ['isTodoSearching']),
  },

  methods: {
    deleteTodo() {
      if (this.isTodoSearching) return
      this.$store.dispatch('todos/delete', this.todo.id)
      toast('success', this.$t('deleted', { item: this.$t('todo') }))
    },
    completeTodo() {
      if (this.isTodoSearching) return
      this.$store.dispatch('todos/complete', this.todo.id)
      toast('success', this.$t('completed', { item: this.$t('todo') }))
    },
    editTodo() {
      if (this.isTodoSearching) return
      this.$store.dispatch('todos/setEditableTodo', this.todo.id)
    },
  },
}
</script>
<style scoped lang="scss">
.action-buttons {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
