<template>
  <header class="header">
    <div class="header__left">
      <ProjectLogo width="36" height="36" />
      <span class="todo__title">{{ $t('todos') }}</span>
      <TodoLanguage />
    </div>
    <SearchBar />
  </header>
</template>
<script>
import SearchBar from '@/components/todo/SearchBar.vue'
import ProjectLogo from '@/icons/ProjectLogo.vue'
import TodoLanguage from '@/components/todo/utils/TodoLanguage.vue'

export default {
  name: 'TodoIndex',
  components: {
    SearchBar,
    ProjectLogo,
    TodoLanguage,
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
  height: $header-height;
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

@media screen and (max-width: $md) {
  .todo__title {
    display: none;
  }
}
</style>
