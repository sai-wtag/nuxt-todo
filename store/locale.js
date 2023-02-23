import { EN, BN, ES } from '@/utils/constants'

export const state = () => ({
  locals: [EN, BN, ES],
  currentLocale: EN,
})

export const getters = {
  getCurrentLocale: (state) => {
    return state.currentLocale
  },
  getLocals: (state) => {
    return state.locals
  },
}

export const mutations = {
  setLocale: (state, locale) => {
    state.currentLocale = locale
  },
}

export const actions = {
  setLocale: ({ commit }, locale) => {
    commit('setLocale', locale)
  },
}
