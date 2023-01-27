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
  ADD_TODO: (state, todo) => {
    const newTodo = {
      id: uuid4(),
      title: todo.title,
      createdAt: new Date(),
      completedAt: null,
    }
    state.list = [newTodo, ...state.list]
  },

  UPDATE_TODO: (state, updatedTodo) => {
    const todoIndex = state.list.findIndex((t) => t.id === updatedTodo.id)
    const todo = state.list[todoIndex]
    todo.title = updatedTodo.title
    state.list.splice(todoIndex, 1, todo)
  },

  SET_IS_CREATING: (state, creatingStatus = true) => {
    state.isCreating = creatingStatus
  },

  REMOVE_TODO: (state, id) => {
    state.list = state.list.filter((todo) => todo.id !== id)
  },

  COMPLETE_TODO: (state, todoId) => {
    const todoIndex = state.list.findIndex((t) => t.id === todoId)
    const todo = state.list[todoIndex]

    todo.completedAt = new Date()
    state.list.splice(todoIndex, 1, todo)
  },

  SET_EDITABLE_TODO: (state, todoId = null) => {
    state.editableTodo = todoId
      ? state.list.find((todo) => todo.id === todoId)
      : null
  },

  INCREMENT_PAGINATION_LIMIT: (state) => {
    state.limit += pageLimit
  },

  SET_CURRENT_TASK_STATE: (state, taskState) => {
    state.currentTaskState = taskState
  },

  SET_CURRENT_TASKS: (state) => {
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
  SET_SEARCH_KEY: (state, searchKey) => {
    state.searchKey = searchKey
  },
  RESET_PAGINATION_LIMIT: (state) => {
    state.limit = pageLimit
  },
}

export const actions = {
  add: ({ commit }, todo) => {
    commit('ADD_TODO', todo)
    commit('SET_IS_CREATING', false)
    commit('SET_CURRENT_TASKS')
  },

  update: ({ commit }, updatedTodo) => {
    commit('UPDATE_TODO', updatedTodo)
    commit('SET_EDITABLE_TODO', null)
  },

  completeAndUpdate: ({ commit }, updatedTodo) => {
    commit('UPDATE_TODO', updatedTodo)
    commit('COMPLETE_TODO', updatedTodo.id)
    commit('SET_EDITABLE_TODO', null)
  },

  deleteCurrentTask: ({ commit }) => {
    commit('SET_IS_CREATING', false)
    commit('SET_EDITABLE_TODO', null)
  },

  setIsCreating: ({ commit }, creatingStatus = true) => {
    commit('SET_IS_CREATING', creatingStatus)
    commit('SET_EDITABLE_TODO', null)
  },

  delete: ({ commit }, todoId) => {
    commit('REMOVE_TODO', todoId)
    commit('SET_CURRENT_TASKS')
  },

  complete: ({ commit }, todoId) => {
    commit('COMPLETE_TODO', todoId)
  },

  setEditableTodo: ({ commit }, todoId) => {
    commit('SET_EDITABLE_TODO', todoId)
  },

  loadMoreTodos: ({ commit }) => {
    commit('INCREMENT_PAGINATION_LIMIT')
  },

  setCurrentTaskState: ({ commit }, taskState) => {
    commit('SET_IS_CREATING', false)
    commit('SET_EDITABLE_TODO', null)
    commit('RESET_PAGINATION_LIMIT')
    commit('SET_CURRENT_TASK_STATE', taskState)
    commit('SET_CURRENT_TASKS')
  },

  searchTasksByTitle: ({ commit }, e) => {
    const searchTasks = _.debounce(() => {
      commit('RESET_PAGINATION_LIMIT')
      commit('SET_SEARCH_KEY', e.target.value)
      commit('SET_CURRENT_TASKS')
    }, 500)
    searchTasks()
  },
}
