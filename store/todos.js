import { createClient } from '@supabase/supabase-js'
import { ALL, COMPLETE, INCOMPLETE } from '@/utils/constants.js'

const supabase = createClient(
  'https://zhsepptcavyowohakieh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoc2VwcHRjYXZ5b3dvaGFraWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0OTE3NzEsImV4cCI6MTk5MTA2Nzc3MX0.SxdLsTGvb6mtyTtqf7zpBkt7IxAVuHvl3r7b3DGVLH8'
)

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
  isTodoLoading: false,
  isCreating: false,
  isSearching: false,
  searchKey: '',
  editableTodo: null,
  limit: pageLimit,
  taskStates: [ALL, COMPLETE, INCOMPLETE],
  currentTaskState: ALL,
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
  isTodoLoading: (state) => {
    return state.isTodoLoading
  },
  isTodoListLoading: (state) => {
    return state.isTodoListLoading
  },
}

export const mutations = {
  ADD_TODO: (state, newTodo) => {
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
  SET_IS_TODO_LOADING: (state, status) => {
    state.isTodoLoading = status
  },
  SET_IS_TODO_LIST_LOADING: (state, status) => {
    state.isTodoListLoading = status
  },
}

export const actions = {
  add: async ({ commit }, form) => {
    try {
      commit('SET_IS_TODO_LOADING', true)
      const { data: createdTodo, error } = await supabase
        .from('todos')
        .insert({
          title: form.title,
        })
        .select()

      if (error) {
        throw new Error(error.message)
      }

      const todo = createdTodo[0]
      commit('ADD_TODO', todo)
      commit('SET_IS_CREATING', false)
      commit('SET_CURRENT_TASKS')

      return {
        success: true,
        message: 'Todo added successfully',
        data: {
          todo,
        },
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
        data: null,
      }
    } finally {
      commit('SET_IS_TODO_LOADING', false)
    }
  },

  update: ({ commit }, updatedTodo) => {
    commit('UPDATE_TODO', updatedTodo)
    commit('SET_EDITABLE_TODO', null)
  },

  completeAndUpdate: ({ commit }, updatedTodo) => {
    commit('UPDATE_TODO', updatedTodo)
    commit('COMPLETE_TODO', updatedTodo.id)
    commit('SET_EDITABLE_TODO', null)
    commit('SET_CURRENT_TASKS')
    commit('CHECK_LOAD_MORE')
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
    commit('CHECK_LOAD_MORE')
  },

  complete: ({ commit }, todoId) => {
    commit('COMPLETE_TODO', todoId)
    commit('SET_CURRENT_TASKS')
    commit('CHECK_LOAD_MORE')
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

  setSearchStatus: ({ commit }, e) => {
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
}
