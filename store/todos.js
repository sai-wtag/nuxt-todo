import Database from '@/classes/Database'
import { ALL, COMPLETE, INCOMPLETE } from '@/utils/constants.js'

const database = new Database()
const supabase = database.supabase

const pageLimit = 3

const getLimit = (state) => {
  let limit = state.limit
  if (state.isCreating) limit--
  return limit
}

export const state = () => ({
  list: [],
  currentTasks: [],
  isTodoListLoading: false,
  isCreating: false,
  isSearching: false,
  loadingId: null,
  searchKey: '',
  editableTodo: null,
  limit: pageLimit,
  taskStates: [ALL, COMPLETE, INCOMPLETE],
  currentTaskState: ALL,
  isLoadedMore: false,
  isTodoAdding: false,
  isTodoUpdating: false,
  isTodoCompleting: false,
  isTodoDeleting: false,
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
    return state.currentTasks.length > getLimit(state)
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
  isTodoSearching: (state) => {
    return state.isSearching
  },
  isTodoListLoading: (state) => {
    return state.isTodoListLoading
  },
  isButtonDisabled: (state) => {
    return (
      state.isSearching ||
      state.isTodoListLoading ||
      state.isTodoAdding ||
      state.isTodoCompleting ||
      state.isTodoUpdating ||
      state.isTodoDeleting
    )
  },
  loadingId: (state) => {
    return state.loadingId
  },
  isTodoAdding: (state) => {
    return state.isTodoAdding
  },
  isSingleTodoUpdating: (state) => {
    return state.isTodoUpdating && state.loadingId === state.editableTodo.id
  },
}

export const mutations = {
  ADD_TODO: (state, newTodo) => {
    state.list = [newTodo, ...state.list]
  },
  SET_IS_CREATING: (state, creatingStatus = true) => {
    state.isCreating = creatingStatus
  },
  REMOVE_TODO: (state, id) => {
    state.list = state.list.filter((todo) => todo.id !== id)
  },
  UPDATE_TODO: (state, updatedTodo) => {
    state.list = state.list.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title
      }
      return todo
    })
  },
  COMPLETE_TODO: (state, updatedTodo) => {
    state.list = state.list.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.completedAt = updatedTodo.completedAt
      }
      return todo
    })
  },
  UPDATE_COMPLETE_TODO: (state, updatedTodo) => {
    state.list = state.list.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title
        todo.completedAt = updatedTodo.completedAt
      }
      return todo
    })
  },
  SET_EDITABLE_TODO: (state, todoId = null) => {
    state.editableTodo = todoId
      ? state.list.find((todo) => todo.id === todoId)
      : null
  },
  INCREMENT_PAGINATION_LIMIT: (state) => {
    state.limit += pageLimit
  },
  SET_LOAD_MORE: (state, status) => {
    state.isLoadedMore = status
  },
  SET_CURRENT_TASK_STATE: (state, taskState) => {
    state.currentTaskState = taskState
  },
  SET_CURRENT_TASKS: (state) => {
    const searchKey = state.searchKey.toLowerCase()
    const list =
      searchKey !== ''
        ? state.list.filter((todo) =>
            todo.title.toLowerCase().includes(searchKey)
          )
        : state.list

    switch (state.currentTaskState) {
      case COMPLETE:
        state.currentTasks = list.filter((todo) => todo.completedAt)
        break
      case INCOMPLETE:
        state.currentTasks = list.filter((todo) => !todo.completedAt)
        break
      default:
        state.currentTasks = list
        break
    }
  },
  SET_SEARCH_KEY: (state, searchKey) => {
    state.searchKey = searchKey
  },
  RESET_PAGINATION_LIMIT: (state) => {
    state.limit = pageLimit
  },
  CHECK_LOAD_MORE: (state) => {
    if (state.currentTasks.length <= pageLimit) {
      state.isLoadedMore = false
    }
  },
  SET_IS_SEARCHING: (state, status) => {
    state.isSearching = status
  },
  SET_IS_TODO_LIST_LOADING: (state, status) => {
    state.isTodoListLoading = status
  },
  SET_LOADING_ID: (state, id) => {
    state.loadingId = id
  },
  SET_ALL_TODOS: (state, todos) => {
    state.list = todos
  },
  SET_IS_TODO_ADDING: (state, status) => {
    state.isTodoAdding = status
  },
  SET_IS_TODO_UPDATING: (state, status) => {
    state.isTodoUpdating = status
  },
  SET_IS_TODO_COMPLETING: (state, status) => {
    state.isTodoCompleting = status
  },
  SET_IS_TODO_DELETING: (state, status) => {
    state.isTodoDeleting = status
  },
}

export const actions = {
  add: async ({ commit }, form) => {
    try {
      commit('SET_IS_TODO_ADDING', true)
      const { data: createdTodo, error } = await supabase
        .from('todos')
        .insert({
          title: form.title,
        })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      commit('ADD_TODO', createdTodo)
      commit('SET_IS_CREATING', false)
      commit('SET_CURRENT_TASKS')

      return {
        success: true,
        data: {
          createdTodo,
        },
      }
    } catch (err) {
      return {
        success: false,
        data: null,
      }
    } finally {
      commit('SET_IS_TODO_ADDING', false)
    }
  },

  deleteCurrentTask: ({ commit }, isTodoEditing = false) => {
    if (!isTodoEditing) {
      commit('SET_IS_CREATING', false)
    }
    commit('SET_EDITABLE_TODO', null)
  },

  setIsCreating: ({ commit }, creatingStatus = true) => {
    commit('SET_IS_CREATING', creatingStatus)
    commit('SET_EDITABLE_TODO', null)
  },

  delete: async ({ commit }, todoId) => {
    try {
      commit('SET_IS_TODO_DELETING', true)
      commit('SET_LOADING_ID', todoId)
      const { error } = await supabase.from('todos').delete().eq('id', todoId)

      if (error) {
        throw new Error(error.message)
      }
      commit('REMOVE_TODO', todoId)
      commit('SET_CURRENT_TASKS')
      commit('CHECK_LOAD_MORE')

      return {
        success: true,
      }
    } catch (err) {
      return {
        success: false,
      }
    } finally {
      commit('SET_IS_TODO_DELETING', false)
      commit('SET_LOADING_ID', null)
    }
  },

  update: async ({ commit }, updatedTodo) => {
    try {
      commit('SET_IS_TODO_UPDATING', true)
      commit('SET_LOADING_ID', updatedTodo.id)

      const { data, error } = await supabase
        .from('todos')
        .update({ title: updatedTodo.title })
        .eq('id', updatedTodo.id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      commit('UPDATE_TODO', data)

      return {
        success: true,
        data,
      }
    } catch (err) {
      return {
        success: false,
        data: null,
      }
    } finally {
      commit('SET_IS_TODO_UPDATING', false)
      commit('SET_LOADING_ID', null)
      commit('SET_EDITABLE_TODO', null)
    }
  },

  complete: async ({ commit }, todoId) => {
    try {
      commit('SET_IS_TODO_COMPLETING', true)
      commit('SET_LOADING_ID', todoId)
      const { data: completedTodo, error } = await supabase
        .from('todos')
        .update({ completedAt: new Date() })
        .eq('id', todoId)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      commit('COMPLETE_TODO', completedTodo)
      commit('SET_CURRENT_TASKS')
      commit('CHECK_LOAD_MORE')

      return {
        success: true,
        data: {
          completedTodo,
        },
      }
    } catch (err) {
      return {
        success: false,
        data: null,
      }
    } finally {
      commit('SET_IS_TODO_COMPLETING', false)
      commit('SET_LOADING_ID', null)
    }
  },

  completeAndUpdate: async ({ commit }, updatedTodo) => {
    try {
      commit('SET_IS_TODO_UPDATING', true)
      commit('SET_LOADING_ID', updatedTodo.id)

      const { data, error } = await supabase
        .from('todos')
        .update({ title: updatedTodo.title, completedAt: new Date() })
        .eq('id', updatedTodo.id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      commit('UPDATE_COMPLETE_TODO', data)
      commit('SET_EDITABLE_TODO', null)
      commit('SET_CURRENT_TASKS')
      commit('CHECK_LOAD_MORE')

      return {
        success: true,
        data,
      }
    } catch (err) {
      return {
        success: false,
        data: null,
      }
    } finally {
      commit('SET_IS_TODO_UPDATING', false)
      commit('SET_LOADING_ID', null)
      commit('SET_EDITABLE_TODO', null)
    }
  },

  setEditableTodo: ({ commit }, todoId) => {
    commit('SET_EDITABLE_TODO', todoId)
  },

  loadMoreTodos: ({ commit, state }) => {
    if (state.isSearching) return
    commit('INCREMENT_PAGINATION_LIMIT')
    commit('SET_LOAD_MORE', true)
  },

  showLessTodos: ({ commit, state }) => {
    if (state.isSearching) return
    commit('RESET_PAGINATION_LIMIT')
    commit('SET_LOAD_MORE', false)
  },

  setCurrentTaskState: ({ commit }, taskState) => {
    commit('SET_IS_CREATING', false)
    commit('SET_EDITABLE_TODO', null)
    commit('SET_CURRENT_TASK_STATE', taskState)
    commit('SET_CURRENT_TASKS')
    commit('RESET_PAGINATION_LIMIT')
    commit('SET_LOAD_MORE', false)
  },

  setSearchStatus: ({ commit }) => {
    commit('SET_IS_SEARCHING', true)
    commit('SET_IS_CREATING', false)
    commit('SET_EDITABLE_TODO', null)
  },

  searchTasksByTitle: ({ commit }, searchKey) => {
    commit('SET_SEARCH_KEY', searchKey)
    commit('SET_CURRENT_TASKS')
    commit('RESET_PAGINATION_LIMIT')
    commit('SET_IS_SEARCHING', false)
    commit('SET_LOAD_MORE', false)
  },

  fetchAllTodos: async ({ commit }) => {
    try {
      commit('SET_IS_TODO_LIST_LOADING', true)
      const { data, error } = await supabase
        .from('todos')
        .select()
        .order('createdAt', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      commit('SET_ALL_TODOS', data)
      commit('SET_CURRENT_TASKS')
      commit('SET_IS_TODO_LIST_LOADING', false)
    } catch (err) {
      commit('SET_IS_TODO_LIST_LOADING', false)
    }
  },

  resetSearchKey: ({ commit }) => {
    commit('SET_SEARCH_KEY', '')
    commit('SET_CURRENT_TASKS')
  },
}
