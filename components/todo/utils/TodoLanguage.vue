<template>
  <select v-model="currentLocale" @change="setLocale">
    <option v-for="locale in getLocals" :key="locale.code" :value="locale.code">
      {{ locale.name }}
    </option>
  </select>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TodoLanguage',
  data() {
    return {
      currentLocale: this.$i18n.locale,
    }
  },
  computed: {
    ...mapGetters('locale', ['getLocals']),
  },
  methods: {
    setLocale(e) {
      if (e.target.value !== '') {
        this.$i18n.setLocale(e.target.value)
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/variables';
@media (max-width: $sm) {
  select {
    width: 100%;
    text-align: center;
  }
}

