<template>
  <SplashScreen v-if="isSplashScreenVisible" />
  <div v-else class="container">
    <TodoHeader />
    <TodoContainer />
  </div>
</template>
<script>
import TodoHeader from '@/components/todo/Header.vue'
import TodoContainer from '@/components/todo/TodoContainer.vue'
import SplashScreen from '@/components/todo/utils/SplashScreen.vue'

export default {
  name: 'TodoIndex',
  components: {
    TodoHeader,
    TodoContainer,
    SplashScreen,
  },
  data() {
    return {
      isSplashScreenVisible: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isSplashScreenVisible = false
    }, 1000)
  },
}
</script>
