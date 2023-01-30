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
  isTodoCreating: (state) => {
    return state.isCreating
  },
  getEditableTodo: (state) => {
    return state.editableTodo
  },
  hasMoreTodos: (state) => {
    return state.list.length > getLimit(state)
  },
  getTaskStates: (state) => {
    return state.taskStates
  },
  getCurrentTaskState: (state) => {
    return state.currentTaskState
  },
  isLoadedMore: (state) => {
    return state.isLoadedMore
  },
}

export const mutations = {
  ADD_TODO: (state, todo) => {
    const newTodo = {
      id: uuid4(),
      title: todo.title,
      createdAt: new Date(),
      completedAt: null,
      isTodoCompleted: false,
    }
    state.list = [newTodo, ...state.list]
  },

  UPDATE_TODO: (state, updatedTodo) => {
    state.list = state.list.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title
      }
      return todo
    })
  },

  SET_IS_CREATING: (state, creatingStatus = true) => {
    state.isCreating = creatingStatus
  },
  REMOVE_TODO: (state, id) => {
    state.list = state.list.filter((todo) => todo.id !== id)
  },
  COMPLETE_TODO: (state, todoId) => {
    state.list = state.list.map((todo) => {
      if (todo.id === todoId) {
        todo.completedAt = new Date()
        todo.isTodoCompleted = true
      }
      return todo
    })
  },
  SET_EDITABLE_TODO: (state, todoId = null) => {
    state.editableTodo = todoId
      ? state.list.find((todo) => todo.id === todoId)
      : null
  },
  SET_LIMIT: (state, limit) => {
    state.limit = limit
  },
  SET_LOAD_MORE: (state, status) => {
    state.isLoadedMore = status
  },

  SET_CURRENT_TASK_STATE: (state, taskState) => {
    state.currentTaskState = taskState
  },

  SET_CURRENT_TASKS: (state) => {
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
  CHECK_LOAD_MORE: (state) => {
    if (state.currentTasks.length <= pageLimit) {
      state.isLoadedMore = false
    }
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
  delete({ commit }, todoId) {
    commit('remove', todoId)
    commit('checkLoadMore')
  },
  complete({ commit }, todoId) {
    commit('complete', todoId)
  },
  setEditableTodo({ commit }, todoId) {
    commit('setEditableTodo', todoId)
  },

  loadMoreTodos: ({ commit, state }) => {
    commit('SET_LIMIT', state.limit + pageLimit)
    commit('SET_LOAD_MORE', true)
  },

  showLessTodos: ({ commit, state }) => {
    commit('SET_LIMIT', pageLimit)
    commit('SET_LOAD_MORE', false)
  },

  setCurrentTaskState: ({ commit }, taskState) => {
    commit('setCurrentTaskState', taskState)
    commit('setCurrentTasks')
    commit('setLimit', pageLimit)
    commit('setLoadMore', false)
  },
}
