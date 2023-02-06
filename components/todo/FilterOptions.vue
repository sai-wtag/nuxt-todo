<template>
  <div class="btn__filter">
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
      'isButtonDisabled',
    ]),
  },
  methods: {
    setCurrentTaskState(task) {
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
}
</style>
