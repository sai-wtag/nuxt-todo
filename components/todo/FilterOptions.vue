<template>
  <div class="btn__filter">
    <template v-if="!isMobile">
      <button
        v-for="task in getTaskStates"
        :key="task"
        type="button"
        :class="{
          active: task === getCurrentTaskState,
        }"
        @click.prevent="setCurrentTaskState(task)"
      >
        {{ $t(task) }}
      </button>
    </template>
    <template v-else>
      <select @change="setCurrentTaskState">
        <option
          v-for="task in getTaskStates"
          :key="task"
          :value="task"
          :selected="task === getCurrentTaskState"
        >
          {{ $t(task) }}
        </option>
      </select>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FilterOptions',
  data: () => ({
    currentTaskState: 'all',
  }),
  computed: {
    ...mapGetters('todos', [
      'getTaskStates',
      'getCurrentTaskState',
      'isButtonDisabled',
    ]),
    ...mapGetters(['isMobile']),
  },

  methods: {
    setCurrentTaskState(task) {
      if (task instanceof Event) task = task.target.value
      this.currentTaskState = task
      if (this.isButtonDisabled) return
      this.$store.dispatch('todos/setCurrentTaskState', task)
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/variables';
@import '@/assets/css/mixins';
.btn__filter {
  @include flex(row, nowrap, center, center);
  button {
    cursor: pointer;
    border: $border-1;
    border-radius: 5px;
    background-color: $bg-white;
    height: $button-height;
    color: #32394b;
    font-size: 16px;
    font-weight: 500;
    line-height: 18.75px;
    padding: 0 10px;

    &.active {
      background-color: #0bc375;
      color: #fff;
    }
  }

  @media (max-width: $sm) {
    width: 100%;
    select {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
