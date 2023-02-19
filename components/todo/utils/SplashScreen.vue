<template>
  <div class="splash-screen">
    <ProjectLogo h="150" w="150" />
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
.splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  background-color: $bg-primary;
  animation: fade 2s linear;
}

.project-title {
  font-size: 96px;
  font-weight: 700;
  color: $text-primary;
}

@keyframes fade {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
