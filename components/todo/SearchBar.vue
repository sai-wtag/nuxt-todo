<template>
  <div>
    <input
      type="text"
      :placeholder="$t('search')"
      @keyup.prevent="searchTasks"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import debounce from '@/helpers/debounce'

export default {
  name: 'SearchBar',
  methods: {
    ...mapActions('todos', ['setSearchStatus', 'searchTasksByTitle']),

    debounceSearchTasks: debounce(function (searchKey) {
      this.searchTasksByTitle(searchKey)
    }, 3000),

    searchTasks(event) {
      this.setSearchStatus()
      this.debounceSearchTasks(event.target.value)
    },
  },
}
</script>
