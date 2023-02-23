<template>
  <div>
    {{ screenWidth }}
    <Nuxt />
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      screenWidth: null,
    }
  },
  computed: {
    isMobile() {
      return this.screenWidth < 768
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize)
    })
  },
  methods: {
    handleResize() {
      this.screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    },
  },
}
</script>
