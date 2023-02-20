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
        <option v-for="task in getTaskStates" :key="task" :value="task">
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
    screenWidth: screen.width,
  }),
  computed: {
    ...mapGetters('todos', [
      'getTaskStates',
      'getCurrentTaskState',
      'isButtonDisabled',
    ]),
    isMobile() {
      return this.screenWidth <= 768
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize)
    })
  },
  methods: {
    setCurrentTaskState(task) {
      if (task instanceof Event) task = task.target.value
      if (this.isButtonDisabled) return
      this.$store.dispatch('todos/setCurrentTaskState', task)
    },
    handleResize() {
      this.screenWidth = screen.width
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
