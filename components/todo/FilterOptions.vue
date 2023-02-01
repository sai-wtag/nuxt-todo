<template>
  <div class="filter-btn">
    <button
      v-for="task in getTaskStates"
      :key="task"
      :class="{
        active: task === getCurrentTaskState,
      }"
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
    ...mapGetters('todos', [
      'getTaskStates',
      'getCurrentTaskState',
      'isTodoSearching',
    ]),
  },
  methods: {
    setCurrentTaskState(task) {
      if (this.isTodoSearching) return
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

.active {
  background-color: #298b6b;
  color: #fff;
}
</style>
