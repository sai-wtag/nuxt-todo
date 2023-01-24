<template>
  <header class="header">
    <div class="header__left">
      <h1>{{ $t('todos') }}</h1>
      <select @change="setLocale">
        <option value="">{{ $t('select-language') }}</option>
        <option
          v-for="locale in getLocals"
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
    </div>
    <SearchBar />
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchBar from '@/components/todo/SearchBar.vue'

export default {
  name: 'TodoIndex',
  components: {
    SearchBar,
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
