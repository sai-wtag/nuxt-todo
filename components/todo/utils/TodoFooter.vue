<template>
  <div class="todo-footer">
    <button
      v-if="hasMoreTodos"
      class="todo-btn__load-more"
      @click.prevent="loadMoreTodos"
    >
      {{ $t('load-more') }}
    </button>
    <button
      v-if="hasLoadedTodos"
      class="todo-btn__show-less"
      @click.prevent="showLessTodos"
    >
      {{ $t('show-less') }}
    </button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TodoFooter',
  computed: {
    ...mapGetters('todos', ['hasMoreTodos', 'isLoadedMore']),
    hasLoadedTodos() {
      return this.isLoadedMore && !this.hasMoreTodos
    },
  },
  methods: {
    ...mapActions('todos', ['loadMoreTodos', 'showLessTodos']),
  },
}
</script>
