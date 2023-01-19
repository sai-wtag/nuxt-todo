<template>
  <div>
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>
    <h1>{{ $t('welcome') }} to Index Page</h1>
    <p>
      This is the index page. You can edit this page in <code>pages/index.vue</code>
    </p>
    <p>
      <ul>
        <li v-for="todo in todos" :key="todo.name">
          {{ todo.name }}
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }

}
</script>
