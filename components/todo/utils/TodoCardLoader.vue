<template>
  <div class="loader-overlay">
    <LoaderIcon class="loader-icon" :width="iconWidth" :height="iconHeight" />
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
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables';
.loader-overlay {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  z-index: 999;
  height: 100%;
  width: 100%;
  top: 0%;
  left: 0%;

  .loader-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    animation: spin 4s linear infinite;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
