<template>
  <header class="header">
    <div class="header__left">
      <ProjectLogo w="34" h="34" />
      <span class="todo__title">{{ $t('todos') }}</span>
      <select class="todo__language" @change="setLocale">
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
import ProjectLogo from '@/icons/ProjectLogo.vue'

export default {
  name: 'TodoIndex',
  components: {
    SearchBar,
    ProjectLogo,
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
@import '@/assets/css/mixins';

header {
  @include padding(20px, $padding-breakpoints);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  background-color: #fff;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.todo__title {
  width: 150px;
  font-size: 36px;
  font-weight: 700;
  line-height: 42.19px;
  color: #7a8dfd;
}

.todo__language {
  width: 180px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e5e5e5;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 19.69px;
  color: #32394b;
  background-color: #fff;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .todo__title,
  .todo__language {
    display: none;
  }
}
</style>
