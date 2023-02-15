<template>
  <div class="container">
    <TodoHeader />
    <TodoContainer />
  </div>
</template>
<script>
import TodoHeader from '@/components/todo/Header.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'

export default {
  name: 'TodoIndex',
  components: {
    TodoHeader,
    TodoContainer,
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss">
@import '@/assets/css/variables';

$padding-breakpoints: (
  576px: 20px,
  768px: 40px,
  992px: 60px,
  1200px: 100px,
);

@mixin padding($min-padding: 20px, $breakpoints) {
  padding: 0 $min-padding;
  @each $breakpoint, $padding in $breakpoints {
    @media (min-width: $breakpoint) {
      padding: 0 $padding;
    }
  }
}

body {
  margin: 0;
  @include padding(20px, $padding-breakpoints);
  background-color: $bg-primary;
  font-family: $font-family;
  min-height: 100vh;
}

svg {
  cursor: pointer;
}
</style>
