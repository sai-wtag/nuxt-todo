export const state = () => ({
  list: [
    {
      name: 'vuex',
      done: false,
    },
    {
      name: 'vuex2',
      done: false,
    },
    {
      name: 'vuex3',
      done: false,
    },
  ],
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
