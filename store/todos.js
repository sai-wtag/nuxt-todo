import uuid4 from 'uuid4'

const pageLimit = 3

const getLimit = (state) => {
  let limit = state.limit
  if (state.isCreating) limit--
  return limit
}

const getCurrentTaskList = (state) => {
  const currentTaskState = state.currentTaskState
  let list = state.list // default: 'all'
  switch (currentTaskState) {
    case 'complete':
      list = list.filter((todo) => todo.completedAt)
      break
    case 'incomplete':
      list = list.filter((todo) => !todo.completedAt)
      break
  }
  return list
}

const getTasksLength = (state) => {
  const currentTasks = getCurrentTaskList(state)
  return currentTasks.length
}

export const state = () => ({
  list: [],
  currentTasks: [],
  isLoading: false,
  isCreating: false,
  editableTodo: null,
  limit: pageLimit,
  taskStates: ['all', 'complete', 'incomplete'],
  currentTaskState: 'all', // 'all'
})

export const getters = {
  todos: (state) => {
    const list = getCurrentTaskList(state)
    return list.slice(0, getLimit(state))
  },
  isTodoCreating(state) {
    return state.isCreating
  },
  getEditableTodo(state) {
    return state.editableTodo
  },
  hasMoreTodos(state) {
    return getTasksLength(state) > getLimit(state)
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
    state.list = state.list.filter((todo) => todo.id !== id)
  },
  complete: (state, todoId) => {
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
  setLimit: (state) => {
    state.limit += pageLimit
  },
  setCurrentTaskState: (state, taskState) => {
    state.currentTaskState = taskState
  },
  setCurrentTasks: (state) => {
    const currentTaskState = state.currentTaskState
    let list = state.list
    switch (currentTaskState) {
      case 'complete':
        list = list.filter((todo) => todo.completedAt)
        break
      case 'incomplete':
        list = list.filter((todo) => !todo.completedAt)
        break
    }
    state.currentTasks = list
  },
}

export const actions = {
  add: ({ commit }, todo) => {
    commit('add', todo)
    commit('setIsCreating', false)
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
    commit('setLimit')
  },

  setCurrentTaskState: ({ commit }, taskState) => {
    commit('setCurrentTaskState', taskState)
    commit('setCurrentTasks')
  },
}
