export const state = () => ({
  list: [],
  isLoading: false,
  isCreating: false,
  editableTodo: null,
})

export const getters = {
  todos: (state) => {
    return state.list
  },
  completedTodos: (state) => {
    return state.list.filter((todo) => todo.completed)
  },
  incompleteTodos: (state) => {
    return state.list.filter((todo) => !todo.completed)
  },
  isTodoCreating(state) {
    return state.isCreating
  },
}

export const mutations = {
  add(state, todo) {
    const newTodo = {
      id: new Date().getTime(),
      title: todo.title,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    }

    state.list = [newTodo, ...state.list]
  },
  setIsCreating(state, creatingStatus = true) {
    state.isCreating = creatingStatus
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}

export const actions = {
  add({ commit }, todo) {
    commit('add', todo)
    commit('setIsCreating', false)
  },
  deleteCurrentTask({ commit }) {
    commit('setIsCreating', false)
  },
  setIsCreating({ commit }, creatingStatus = true) {
    commit('setIsCreating', creatingStatus)
  },
}
