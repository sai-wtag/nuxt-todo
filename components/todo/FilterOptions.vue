<template>
  <div class="filter-btn">
    <button
      v-for="task in getTaskStates"
      :key="task"
      @click.prevent="setCurrentTaskState(task)"
    >
      {{ $t(task) }}
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FilterOptions',
  computed: {
    ...mapGetters('todos', ['getTaskStates', 'getCurrentTask']),
  },
  methods: {
    setCurrentTaskState(task) {
      this.$store.dispatch('todos/setCurrentTaskState', task)
    },
  },
}
</script>
<style scoped>
.filter-btn {
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>
