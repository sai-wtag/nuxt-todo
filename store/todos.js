import uuid4 from 'uuid4'
import _ from 'lodash'

const pageLimit = 3

const getLimit = (state) => {
  let limit = state.limit
  if (state.isCreating) limit--
  return limit
}

export const state = () => ({
  list: [],
  currentTasks: [],
  isLoading: false,
  isCreating: false,
  isSearching: false,
  searchKey: '',
  editableTodo: null,
  limit: pageLimit,
  taskStates: ['all', 'complete', 'incomplete'],
  currentTaskState: 'all',
})

export const getters = {
  todos: (state) => {
    return state.currentTasks.slice(0, getLimit(state))
  },
  isTodoCreating(state) {
    return state.isCreating
  },
  getEditableTodo(state) {
    return state.editableTodo
  },
  hasMoreTodos(state) {
    return state.currentTasks.length > getLimit(state)
  },
  getTaskStates(state) {
    return state.taskStates
  },
  getCurrentTaskState(state) {
    return state.currentTaskState
  },
}

export const mutations = {
  add: (state, todo) => {
    const newTodo = {
      id: uuid4(),
      title: todo.title,
      createdAt: new Date(),
      completedAt: null,
    }
    state.list = [newTodo, ...state.list]
  },

  update: (state, updatedTodo) => {
    const todoIndex = state.list.findIndex((t) => t.id === updatedTodo.id)
    const todo = state.list[todoIndex]
    todo.title = updatedTodo.title
    state.list.splice(todoIndex, 1, todo)
  },

  setIsCreating: (state, creatingStatus = true) => {
    state.isCreating = creatingStatus
  },

  remove: (state, id) => {
    state.currentTasks = state.currentTasks.filter((todo) => todo.id !== id)
  },

  complete: (state, todoId) => {
    const todoIndex = state.currentTasks.findIndex((t) => t.id === todoId)
    const todo = state.currentTasks[todoIndex]

    todo.completedAt = new Date()
    state.currentTasks.splice(todoIndex, 1, todo)
  },

  setEditableTodo: (state, todoId = null) => {
    state.editableTodo = todoId
      ? state.currentTasks.find((todo) => todo.id === todoId)
      : null
  },

  incrementLimit: (state) => {
    state.limit += pageLimit
  },

  setCurrentTaskState: (state, taskState) => {
    state.currentTaskState = taskState
  },

  setCurrentTasks: (state) => {
    const currentTaskState = state.currentTaskState
    const searchKey = state.searchKey

    let list =
      searchKey !== ''
        ? state.list.filter((todo) => todo.title.includes(searchKey))
        : state.list

    switch (currentTaskState) {
      case 'complete':
        list = list.filter((todo) => todo.completedAt)
        break
      case 'incomplete':
        list = list.filter((todo) => !todo.completedAt)
        break
    }
    state.currentTasks = [...list]
  },
  setSearchKey: (state, searchKey) => {
    state.searchKey = searchKey
  },
  resetPageLimit: (state) => {
    state.limit = pageLimit
  },
}

export const actions = {
  add: ({ commit }, todo) => {
    commit('add', todo)
    commit('setIsCreating', false)
    commit('setCurrentTasks')
  },

  update: ({ commit }, updatedTodo) => {
    commit('update', updatedTodo)
    commit('setEditableTodo', null)
  },

  completeAndUpdate: ({ commit }, updatedTodo) => {
    commit('update', updatedTodo)
    commit('complete', updatedTodo.id)
    commit('setEditableTodo', null)
  },

  deleteCurrentTask: ({ commit }) => {
    commit('setIsCreating', false)
    commit('setEditableTodo', null)
  },

  setIsCreating: ({ commit }, creatingStatus = true) => {
    commit('setIsCreating', creatingStatus)
    commit('setEditableTodo', null)
  },

  delete: ({ commit }, todoId) => {
    commit('remove', todoId)
  },

  complete: ({ commit }, todoId) => {
    commit('complete', todoId)
  },

  setEditableTodo: ({ commit }, todoId) => {
    commit('setEditableTodo', todoId)
  },

  loadMoreTodos: ({ commit }) => {
    commit('incrementLimit')
  },

  setCurrentTaskState: ({ commit }, taskState) => {
    // commit('setSearchKey', '')
    commit('resetPageLimit')
    commit('setCurrentTaskState', taskState)
    commit('setCurrentTasks')
  },

  searchTasksByTitle: ({ commit }, e) => {
    const searchTasks = _.debounce(() => {
      commit('resetPageLimit')
      commit('setSearchKey', e.target.value)
      commit('setCurrentTasks')
    }, 1000)
    searchTasks()
  },
}
