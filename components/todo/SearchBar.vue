<template>
  <div>
    <input
      type="text"
      :placeholder="$t('search')"
      @keyup.prevent="searchTasksByTitle"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SearchBar',
  methods: {
    ...mapActions('todos', ['searchTasksByTitle']),
  },
}
</script>
