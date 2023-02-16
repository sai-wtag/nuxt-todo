<template>
  <div class="todo__search">
    <transition name="search">
      <input
        v-if="isInputVisible"
        ref="searchInputRef"
        class="search-input"
        type="text"
        :placeholder="$t('search')"
        @keyup.prevent="searchTasks"
      />
    </transition>
    <div @click="toggleSearchInput"><SearchIcon /></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import debounce from '@/helpers/debounce'

import SearchIcon from '@/icons/SearchIcon'

export default {
  name: 'SearchBar',
  components: {
    SearchIcon,
  },
  data() {
    return {
      isInputVisible: false,
      searchInputRef: null,
    }
  },
  computed: {
    ...mapGetters('todos', ['isButtonDisabled']),
  },
  methods: {
    ...mapActions('todos', ['setSearchStatus', 'searchTasksByTitle']),

    debounceSearchTasks: debounce(function (searchKey) {
      this.searchTasksByTitle(searchKey)
    }, 500),

    searchTasks(event) {
      if (this.isButtonDisabled) return
      this.setSearchStatus()
      this.debounceSearchTasks(event.target.value)
    },

    toggleSearchInput() {
      this.isInputVisible = !this.isInputVisible
      if (this.isInputVisible) {
        this.$nextTick(() => {
          this.$refs.searchInputRef.focus()
        })
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/variables';
@import '@/assets/css/mixins';

.todo__search {
  @include flex(row, nowrap, center, center, 15px);
}
.search-input {
  border: $border-1;
  border-radius: 5px;
  padding: 0 10px;
  resize: none;
  outline: none;
  color: #32394b;
  height: 36px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;

  @media (min-width: 576px) {
    width: 200px;
  }
  @media (min-width: 1024px) {
    width: 300px;
  }
  @media (min-width: 1200px) {
    width: 500px;
  }
}

.search-enter-active,
.search-leave-active {
  transition: all 0.3s ease;
}
.search-enter,
.search-leave-active {
  opacity: 0;
}
</style>
