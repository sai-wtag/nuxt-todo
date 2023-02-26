<template>
  <div class="todo__not-found">
    <div @click="setIsCreating">
      <NotFoundIcon class="todo__not-found-icon" />
    </div>
    <span class="text__not-found">
      {{ $t('not-found', { item: $t('todos') }) }}
    </span>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NotFoundIcon from '@/icons/NotFoundIcon.vue'
export default {
  name: 'TodoNotFound',
  components: {
    NotFoundIcon,
  },
  methods: {
    ...mapActions('todos', ['setIsCreating']),
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables';
@import '@/assets/css/mixins';
.todo__not-found {
  @include flex(column, nowrap, center, center, 10px);
}

.text__not-found {
  font-weight: 700;
  font-size: 24px;
  color: #32394b;
  text-align: center;
  overflow-wrap: break-word;
}

$not-found-breakpoints: (
  #{$xxs}: 100px,
  #{$xs}: 120px,
  #{$sm}: 200px,
  #{$md}: 250px,
  #{$lg}: 300px
);
.todo__not-found-icon {
  @each $breakpoint, $size in $not-found-breakpoints {
    @media (min-width: $breakpoint) {
      width: $size;
    }
  }
}
</style>
