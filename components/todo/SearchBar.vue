<template>
  <div>
    <input
      v-model="searchTitleInput"
      type="text"
      :placeholder="$t('search')"
      @keyup.prevent="searchTasksByTitle"
    />
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTitleInput: '',
    }
  },
  methods: {
    searchTasksByTitle() {
      this.$store.dispatch('todos/searchTasksByTitle', this.searchTitleInput)
    },
  },
}
</script>
