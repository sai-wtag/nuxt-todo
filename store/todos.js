import uuid4 from 'uuid4'

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
  editableTodo: null,
  limit: pageLimit,
  taskStates: ['all', 'complete', 'incomplete'],
  currentTaskState: 'all',
  isLoadedMore: false,
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
  isLoadedMore(state) {
    return state.isLoadedMore
  },
}

export const mutations = {
  add: (state, todo) => {
    const newTodo = {
      id: uuid4(),
      title: todo.title,
      createdAt: new Date(),
      completedAt: null,
      isTodoCompleted: false,
    }
    state.list = [newTodo, ...state.list]
  },

  update: (state, updatedTodo) => {
    state.list = state.list.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title
      }
      return todo
    })
  },

  setIsCreating: (state, creatingStatus = true) => {
    state.isCreating = creatingStatus
  },

  remove: (state, id) => {
    state.list = state.list.filter((todo) => todo.id !== id)
  },

  complete: (state, todoId) => {
    state.list = state.list.map((todo) => {
      if (todo.id === todoId) {
        todo.completedAt = new Date()
        todo.isTodoCompleted = true
      }
      return todo
    })
  },

  setEditableTodo: (state, todoId = null) => {
    state.editableTodo = todoId
      ? state.list.find((todo) => todo.id === todoId)
      : null
  },
  setLimit: (state, limit) => {
    state.limit = limit
  },
  setLoadMore: (state, status) => {
    state.isLoadedMore = status
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
  checkLoadMore: (state) => {
    if (state.currentTasks.length <= pageLimit) {
      state.isLoadedMore = false
    }
  },
  checkLimit: (state) => {
    state.limit = Math.ceil(state.list.length / pageLimit) * pageLimit
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
    commit('setCurrentTasks')
    commit('checkLoadMore')
  },

  complete: ({ commit }, todoId) => {
    commit('complete', todoId)
  },

  setEditableTodo: ({ commit }, todoId) => {
    commit('setEditableTodo', todoId)
  },
  loadMoreTodos({ commit, state }) {
    commit('setLimit', state.limit + pageLimit)
    commit('setLoadMore', true)
  },
  showLessTodos({ commit, state }) {
    commit('setLimit', pageLimit)
    commit('setLoadMore', false)
  },

  setCurrentTaskState: ({ commit }, taskState) => {
    commit('setCurrentTaskState', taskState)
    commit('setCurrentTasks')
  },
}
