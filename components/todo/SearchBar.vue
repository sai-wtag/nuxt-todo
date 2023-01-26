<template>
  <div>
    <input
      v-model="searchTitleInput"
      type="text"
      :placeholder="$t('search')"
      @keyup.prevent="searchTitle"
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
    searchTitle() {
      this.$store.dispatch('todos/searchTitle', this.searchTitleInput)
    },
  },
}
</script>
