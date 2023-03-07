<template>
  <div class="loader-overlay">
    <LoaderIcon class="loader-icon" :w="iconWidth" :h="iconHeight" />
  </div>
</template>

<script>
import LoaderIcon from '@/icons/LoaderIcon.vue'
export default {
  name: 'TodoCardLoader',
  components: {
    LoaderIcon,
  },
  props: {
    isMainLoader: {
      type: Boolean,
      default: true,
    },
    iconWidth: {
      type: String,
      default: '102',
    },
    iconHeight: {
      type: String,
      default: '102',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables';
@import '@/assets/css/mixins';
.loader-overlay {
  background: rgba(255, 255, 255, 0.7);
  z-index: 999;
  height: 100%;
  width: 100%;
  left: 0%;
}
.loader-overlay,
.loader-overlay .loader-icon {
  position: absolute;
}
.loader-overlay .loader-icon {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  animation: spin 4s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
