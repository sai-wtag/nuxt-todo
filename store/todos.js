import uuid4 from 'uuid4'

const pageLimit = 3

const getLimit = (state) => {
  let limit = state.limit
  if (state.isCreating) limit--
  return limit
}

export const state = () => ({
  list: [],
  isLoading: false,
  isCreating: false,
  editableTodo: null,
  limit: pageLimit,
  isLoadedMore: false,
})

export const getters = {
  todos: (state) => {
    return state.list.slice(0, getLimit(state))
  },
  completedTodos: (state) => {
    return state.list.filter((todo) => todo.completed)
  },
  incompleteTodos: (state) => {
    return state.list.filter((todo) => !todo.completed)
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
  CHECK_LOAD_MORE: (state) => {
    if (state.list.length <= pageLimit) {
      state.isLoadedMore = false
    }
  },
}

export const actions = {
  add: ({ commit }, todo) => {
    commit('ADD_TODO', todo)
    commit('SET_IS_CREATING', false)
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
    commit('CHECK_LOAD_MORE')
  },

  complete: ({ commit }, todoId) => {
    commit('COMPLETE_TODO', todoId)
  },

  setEditableTodo: ({ commit }, todoId) => {
    commit('SET_EDITABLE_TODO', todoId)
  },

  loadMoreTodos: ({ commit, state }) => {
    commit('SET_LIMIT', state.limit + pageLimit)
    commit('SET_LOAD_MORE', true)
  },

  showLessTodos: ({ commit, state }) => {
    commit('SET_LIMIT', pageLimit)
    commit('SET_LOAD_MORE', false)
  },
}
