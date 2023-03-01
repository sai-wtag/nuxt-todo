<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters(['isMobile', 'screenWidth']),
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions(['setScreenWidth']),
    handleResize() {
      this.setScreenWidth(this.getScreenWidth())
    },
    getScreenWidth() {
      const screenWidth = 0
      if (process.client) {
        return (
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
        )
      }
      return screenWidth
    },
  },
}
</script>
