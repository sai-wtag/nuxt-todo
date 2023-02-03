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
<style scoped lang="scss">
@import '@/assets/css/variables';
.todo-footer {
  button {
    margin: 5px;
    height: 36px;
    padding: 5px 10px;
    border: $border-1;
    border-radius: 5px;
    color: $bg-white;
    background-color: #32394b;
    font-size: 16px;
    font-weight: 500;
    line-height: 18.75px;
    cursor: pointer;
  }
}
</style>
