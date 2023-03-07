<template>
  <div class="splash-screen">
    <ProjectLogo class="splash-screen-logo" />
    <span class="project-title">{{ $t('todos') }}</span>
  </div>
</template>
<script>
import ProjectLogo from '@/icons/ProjectLogo.vue'
export default {
  name: 'SplashScreen',
  components: {
    ProjectLogo,
  },
}
</script>
<style lang="scss">
@import '@/assets/css/variables';
@import '@/assets/css/mixins';

.splash-screen {
  @include flex(row, nowrap, center, center, 20px);
  height: 100dvh;
  width: 100dvw;
  background-color: $bg-primary;
  animation: fade 2s;
}

.project-title {
  font-weight: 700;
  color: $text-primary;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@mixin splash($width: 120px, $height: 120px, $font-size: 84px, $display: none) {
  .splash-screen-logo {
    width: $width;
    height: $height;
  }
  .project-title {
    font-size: $font-size;
    display: $display;
  }
}

$xs-values: 150px, 150px, 84px, none;
$sm-values: 150px, 150px, 96px, block;

$splash-breakpoints: (#{$xs}: $xs-values, #{$sm}: $sm-values);

@include splash($xs-values);
@each $breakpoint, $values in $splash-breakpoints {
  @media (min-width: $breakpoint) {
    @include splash($values...);
  }
}
</style>
