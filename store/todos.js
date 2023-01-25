import uuid4 from 'uuid4'

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
  getEditableTodo(state) {
    return state.editableTodo
  },
}

export const mutations = {
  add(state, todo) {
    const newTodo = {
      id: uuid4(),
      title: todo.title,
      createdAt: new Date(),
      completedAt: null,
    }

    state.list = [newTodo, ...state.list]
  },

  update(state, updatedTodo) {
    const todoIndex = state.list.findIndex((t) => t.id === updatedTodo.id)
    const todo = state.list[todoIndex]
    todo.title = updatedTodo.title
    state.list.splice(todoIndex, 1, todo)
  },

  setIsCreating(state, creatingStatus = true) {
    state.isCreating = creatingStatus
  },
  remove(state, id) {
    state.list = state.list.filter((todo) => todo.id !== id)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
  complete(state, todoId) {
    const todoIndex = state.list.findIndex((t) => t.id === todoId)
    const todo = state.list[todoIndex]

    todo.completedAt = new Date()
    state.list.splice(todoIndex, 1, todo)
  },
  setEditableTodo: (state, todoId = null) => {
    state.editableTodo = todoId
      ? state.list.find((todo) => todo.id === todoId)
      : null
  },
}

export const actions = {
  add({ commit }, todo) {
    commit('add', todo)
    commit('setIsCreating', false)
  },
  update({ commit }, updatedTodo) {
    commit('update', updatedTodo)
    commit('setEditableTodo', null)
  },
  completeAndUpdate({ commit }, updatedTodo) {
    commit('update', updatedTodo)
    commit('complete', updatedTodo.id)
    commit('setEditableTodo', null)
  },
  deleteCurrentTask({ commit }) {
    commit('setIsCreating', false)
    commit('setEditableTodo', null)
  },
  setIsCreating({ commit }, creatingStatus = true) {
    commit('setIsCreating', creatingStatus)
    commit('setEditableTodo', null)
  },
  delete({ commit }, todoId) {
    commit('remove', todoId)
  },
  complete({ commit }, todoId) {
    commit('complete', todoId)
  },
  setEditableTodo({ commit }, todoId) {
    commit('setEditableTodo', todoId)
  },
}
